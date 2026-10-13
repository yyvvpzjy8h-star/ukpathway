import { describe, expect, it } from "vitest";
import { EMPTY_PROFILE, type Profile } from "./profile";
import { bandFor, checkReqs, offers, recommend, scoreToGrades, studentScore } from "./recommend";
import { COURSES, courseById, matchesCourse } from "../data/courses";
import { UNIVERSITIES, uniById } from "../data/universities";

const sixth = (subjects: [string, string][], extra: Partial<Profile> = {}): Profile => ({
  ...EMPTY_PROFILE,
  stage: "sixth",
  subjects: subjects.map(([subject, grade]) => ({ subject: subject as Profile["subjects"][number]["subject"], board: "aqa", grade })),
  ...extra,
});

describe("studentScore", () => {
  it("adds the best three A-level grades", () => {
    expect(studentScore(sixth([["maths", "A*"], ["physics", "A"], ["chemistry", "A"], ["history", "B"]]))).toBe(10);
    expect(scoreToGrades(10)).toBe("A*AA");
  });
  it("scores Cambridge International A-levels like A-levels", () => {
    expect(studentScore(sixth([["maths", "A*"], ["physics", "A*"], ["chemistry", "A"]], { qual: "cie" }))).toBe(11);
  });
  it("needs three subjects", () => {
    expect(studentScore(sixth([["maths", "A*"], ["physics", "A"]]))).toBeNull();
  });
  it("converts IB totals", () => {
    expect(studentScore({ ...EMPTY_PROFILE, stage: "sixth", qual: "ib", ibTotal: 38 })).toBe(10);
    expect(studentScore({ ...EMPTY_PROFILE, stage: "sixth", qual: "ib", ibTotal: 33 })).toBe(7);
  });
  it("is null for GCSE-stage students", () => {
    expect(studentScore({ ...EMPTY_PROFILE, stage: "gcse" })).toBeNull();
  });
});

describe("bands", () => {
  it("classifies against the offer", () => {
    expect(bandFor(11, 10)).toBe("safer");
    expect(bandFor(10, 10)).toBe("match");
    expect(bandFor(9, 10)).toBe("reach");
    expect(bandFor(7, 10)).toBe("longshot");
  });
});

describe("course availability and requirements", () => {
  it("knows specialist courses", () => {
    expect(offers(uniById("warwick")!, courseById("medicine"))).toBe(false);
    expect(offers(uniById("leeds")!, courseById("medicine"))).toBe(true);
    expect(offers(uniById("imperial")!, courseById("law"))).toBe(false);
  });
  it("lists niche courses such as Planning & Real Estate at Manchester", () => {
    expect(offers(uniById("manchester")!, courseById("planning"))).toBe(true);
    expect(matchesCourse(courseById("planning"), "real estate")).toBe(true);
  });
  it("offers every course somewhere", () => {
    for (const c of COURSES) expect(UNIVERSITIES.some((u) => offers(u, c)), c.id).toBe(true);
  });
  it("flags missing Chemistry for medicine", () => {
    const checks = checkReqs(courseById("medicine"), ["biology", "maths", "physics"]);
    expect(checks[0].met).toBe(false);
    expect(checks[1].met).toBe(true);
  });
  it("respects region filters", () => {
    const p = sixth([["maths", "A"], ["economics", "A"], ["history", "A"]], { regions: ["scotland"] });
    const [r] = recommend(p, ["economics"]);
    expect(r.matches.every((m) => m.uni.nation === "Scotland")).toBe(true);
    expect(r.matches.length).toBeGreaterThan(0);
  });
});
