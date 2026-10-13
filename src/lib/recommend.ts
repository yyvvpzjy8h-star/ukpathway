import { COURSES, SUBJECT_TO_COURSES, courseById, type Course, type CourseId, type Req } from "../data/courses";
import { careerById } from "../data/careers";
import { gcsePoints, type SubjectId } from "../data/subjects";
import { UNIVERSITIES, homeFeeFor, type University } from "../data/universities";
import type { FeeType, Profile } from "./profile";

const ALEVEL_POINTS: Record<string, number> = { "A*": 4, A: 3, B: 2, C: 1, D: 0.5, E: 0 };
const BTEC_POINTS: Record<string, number> = { "D*": 4, D: 3, M: 2, P: 1 };
const HIGHER_POINTS: Record<string, number> = { A: 3, B: 2, C: 1, D: 0 };

export const GRADE_LABEL: Record<number, string> = {
  12: "A*A*A*", 11: "A*A*A", 10: "A*AA", 9: "AAA", 8: "AAB", 7: "ABB", 6: "BBB", 5: "BBC", 4: "BCC", 3: "CCC",
};
export const scoreToGrades = (n: number) => GRADE_LABEL[Math.max(3, Math.min(12, Math.round(n)))];

function bestN(values: number[], n: number) {
  return [...values].sort((a, b) => b - a).slice(0, n);
}

// Converts a profile's predicted grades into an A-level-style points score (best three, A*=4).
// Returns null when there isn't enough information.
export function studentScore(p: Profile): number | null {
  if (p.stage !== "sixth") return null;
  if (p.qual === "ib") {
    const t = p.ibTotal;
    if (!t) return null;
    if (t >= 40) return 11;
    if (t >= 38) return 10;
    if (t >= 36) return 9;
    if (t >= 34) return 8;
    if (t >= 32) return 7;
    if (t >= 30) return 6;
    return 5;
  }
  if (p.qual === "scottish") {
    const pts = bestN(p.subjects.map((s) => HIGHER_POINTS[s.grade] ?? 0), 5);
    if (pts.length < 4) return null;
    const sum = pts.reduce((a, b) => a + b, 0);
    return Math.max(4, sum - 6);
  }
  const table = p.qual === "btec" ? BTEC_POINTS : ALEVEL_POINTS;
  const pts = bestN(p.subjects.map((s) => table[s.grade] ?? 0), 3);
  if (pts.length < 3) return null;
  return pts.reduce((a, b) => a + b, 0);
}

export function gcseSummary(p: Profile) {
  if (p.gcses.length === 0) return null;
  const pts = p.gcses.map((g) => gcsePoints(g.grade));
  const avg = pts.reduce((a, b) => a + b, 0) / pts.length;
  const top = pts.filter((x) => x >= 8).length;
  const maths = p.gcses.find((g) => g.subject === "maths");
  const english = p.gcses.find((g) => g.subject === "english_lang" || g.subject === "english_lit");
  return {
    avg,
    top,
    count: pts.length,
    maths: maths ? gcsePoints(maths.grade) : null,
    english: english ? gcsePoints(english.grade) : null,
  };
}

export type ReqCheck = { req: Req; met: boolean };

export function checkReqs(course: Course, subjects: SubjectId[]): ReqCheck[] {
  return course.reqs.map((req) => ({
    req,
    met: req.anyOf.filter((s) => subjects.includes(s)).length >= req.count,
  }));
}

export function offers(u: University, c: Course) {
  if (c.specialist) return u.specialist.includes(c.id);
  return !u.noCourses.includes(c.id);
}

export function offerFor(u: University, c: Course): number {
  switch (c.competitiveness) {
    case "top":
      return u.offerMax;
    case "high":
      return Math.max(u.offerMin, u.offerMax - 1);
    case "mid":
      return Math.round((u.offerMin + u.offerMax) / 2);
    default:
      return u.offerMin;
  }
}

export type Band = "safer" | "match" | "reach" | "longshot";

export function bandFor(score: number, offer: number): Band {
  const d = score - offer;
  if (d >= 1) return "safer";
  if (d >= 0) return "match";
  if (d >= -1) return "reach";
  return "longshot";
}

// Rough yearly living cost (rent for 44 weeks + other costs for 10 months) by cost tier.
export const LIVING_BY_TIER: Record<1 | 2 | 3, number> = { 1: 11800, 2: 13600, 3: 16100 };

export function tuitionFor(u: University, fee: FeeType): number {
  if (fee === "intl") return u.calcIntlDefault;
  return homeFeeFor(u, fee === "scottish") ?? 9535;
}

export function yearlyCost(u: University, fee: FeeType) {
  return tuitionFor(u, fee) + LIVING_BY_TIER[u.costTier];
}

function matchesPrefs(u: University, p: Profile) {
  if (p.regions.length) {
    const region = u.london ? "london" : u.nation === "England" ? "england" : u.nation === "Scotland" ? "scotland" : "wales_ni";
    if (!p.regions.includes(region)) return false;
  }
  if (p.setting === "campus" && !u.tags.includes("campus")) return false;
  if (p.setting === "city" && !u.tags.includes("city") && !u.london) return false;
  if (p.setting === "collegiate" && !u.tags.includes("collegiate")) return false;
  if (p.budget > 0 && yearlyCost(u, p.feeType) > p.budget) return false;
  return true;
}

export type UniMatch = { uni: University; offer: number; band: Band | null; cost: number };

export type CourseResult = {
  course: Course;
  reqs: ReqCheck[];
  matches: UniMatch[];
  filteredOut: number;
};

export function recommend(p: Profile, courseIds: CourseId[]): CourseResult[] {
  const score = studentScore(p);
  const subjects = p.subjects.map((s) => s.subject);
  return courseIds.map((id) => {
    const course = courseById(id);
    const offering = UNIVERSITIES.filter((u) => offers(u, course));
    const kept = offering.filter((u) => matchesPrefs(u, p));
    const matches = kept
      .map((uni) => {
        const offer = offerFor(uni, course);
        return { uni, offer, band: score === null ? null : bandFor(score, offer), cost: yearlyCost(uni, p.feeType) };
      })
      .sort((a, b) => (a.uni.qs2027 ?? 999) - (b.uni.qs2027 ?? 999));
    return { course, reqs: checkReqs(course, subjects), matches, filteredOut: offering.length - kept.length };
  });
}

// Courses to look at: the user's picks, plus ones linked to chosen careers, or suggested from strong subjects.
export function coursesToShow(p: Profile): { ids: CourseId[]; suggested: boolean } {
  const ids = new Set<CourseId>(p.interests);
  for (const c of p.careers) careerById(c)?.courses.slice(0, 2).forEach((x) => ids.add(x));
  if (ids.size > 0) return { ids: [...ids].slice(0, 4), suggested: false };

  const weights = new Map<CourseId, number>();
  const rows = p.stage === "sixth" ? p.subjects : p.gcses;
  for (const r of rows) {
    const w = p.stage === "sixth" ? (ALEVEL_POINTS[r.grade] ?? BTEC_POINTS[r.grade] ?? Number(r.grade) / 2) : gcsePoints(r.grade) / 2;
    for (const c of SUBJECT_TO_COURSES[r.subject] ?? []) weights.set(c, (weights.get(c) ?? 0) + w);
  }
  const sorted = [...weights.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c);
  return { ids: sorted.slice(0, 3), suggested: true };
}

export type ALevelSuggestion = { subject: SubjectId; reason: "required" | "helpful" | "strength" };

// For GCSE students: which A-level subjects keep their target courses open.
export function suggestALevels(p: Profile, courseIds: CourseId[]): ALevelSuggestion[] {
  const out = new Map<SubjectId, ALevelSuggestion["reason"]>();
  for (const id of courseIds) {
    const c = courseById(id);
    for (const r of c.reqs) {
      const pick = r.anyOf.slice(0, r.count);
      pick.forEach((s) => out.set(s, "required"));
    }
  }
  for (const id of courseIds) {
    for (const s of courseById(id).helpful.slice(0, 2)) if (!out.has(s)) out.set(s, "helpful");
  }
  const strongest = [...p.gcses].sort((a, b) => gcsePoints(b.grade) - gcsePoints(a.grade));
  for (const g of strongest) {
    if (out.size >= 5) break;
    if (!out.has(g.subject) && g.subject !== "english_lang") out.set(g.subject, "strength");
  }
  return [...out.entries()].map(([subject, reason]) => ({ subject, reason }));
}

export const ALL_COURSE_IDS = COURSES.map((c) => c.id);
