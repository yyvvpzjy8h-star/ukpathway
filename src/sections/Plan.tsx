import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BookOpen, Briefcase, CheckCircle2, ChevronDown, CircleAlert, GraduationCap, Plus, RotateCcw, Search, Sparkles, Trash2, UserRound, X } from "lucide-react";
import { gbp, useLang, type L } from "../i18n";
import { COURSES, GROUPS, courseById, matchesCourse, type CourseId } from "../data/courses";
import { CAREERS, careerById } from "../data/careers";
import { BOARDS, GCSE_QUALS, OFTEN_NOT_COUNTED, QUALS, SUBJECTS, subjectName, type SubjectId } from "../data/subjects";
import { UNIVERSITIES, type University } from "../data/universities";
import { EMPTY_PROFILE, clearProfile, loadProfile, saveProfile, type FeeType, type Profile, type Region, type Setting, type SubjectRow } from "../lib/profile";
import { coursesToShow, gcseSummary, offers, recommend, scoreToGrades, studentScore, suggestALevels, type Band, type CourseResult } from "../lib/recommend";
import { Callout, Card, Pill, Select, ToggleChip, UniPhoto, type Tone } from "../components/ui";

export const BAND_INFO: Record<Band, { label: L; tone: Tone; hint: L }> = {
  safer: { label: { en: "Safer bet", zh: "较稳妥" }, tone: "green", hint: { en: "Your predictions are above the typical offer", zh: "你的预估成绩高于常见录取要求" } },
  match: { label: { en: "Good match", zh: "匹配" }, tone: "blue", hint: { en: "Your predictions meet the typical offer", zh: "你的预估成绩刚好达到常见要求" } },
  reach: { label: { en: "Reach", zh: "冲刺" }, tone: "violet", hint: { en: "One grade below the typical offer — worth a try", zh: "比常见要求低一档，值得一试" } },
  longshot: { label: { en: "Long shot", zh: "难度较大" }, tone: "rose", hint: { en: "Well below the typical offer", zh: "明显低于常见要求" } },
};

function SubjectRows({
  rows,
  onChange,
  boards,
  grades,
  addLabel,
}: {
  rows: SubjectRow[];
  onChange: (rows: SubjectRow[]) => void;
  boards: string[];
  grades: string[];
  addLabel: string;
}) {
  const { t } = useLang();
  const update = (i: number, patch: Partial<SubjectRow>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const used = new Set(rows.map((r) => r.subject));
  const firstFree = SUBJECTS.find((s) => !used.has(s.id))?.id ?? "maths";
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-[minmax(0,1fr)_5rem_2.75rem] gap-2 rounded-xl bg-slate-50 p-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_5rem_2.75rem]">
          <Select
            label={t({ en: "Subject", zh: "科目" })}
            value={r.subject}
            onChange={(v) => update(i, { subject: v as SubjectId })}
            options={SUBJECTS.map((s) => ({ value: s.id, label: t(s.name) }))}
            className="col-span-3 w-full min-w-0 sm:col-span-1"
          />
          <Select
            label={t({ en: "Exam board", zh: "考试局" })}
            value={boards.includes(r.board) ? r.board : boards[0]}
            onChange={(v) => update(i, { board: v })}
            options={boards.map((b) => ({ value: b, label: BOARDS[b].name }))}
            className="w-full min-w-0"
          />
          <Select
            label={t({ en: "Grade", zh: "成绩" })}
            value={grades.includes(r.grade) ? r.grade : grades[0]}
            onChange={(v) => update(i, { grade: v })}
            options={grades.map((g) => ({ value: g, label: g }))}
            className="w-full min-w-0"
          />
          <button
            type="button"
            onClick={() => onChange(rows.filter((_, j) => j !== i))}
            aria-label={t({ en: "Remove", zh: "删除" })}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-white hover:text-rose-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, { subject: firstFree, board: boards[0], grade: grades[0] }])}
        className="flex min-h-[44px] items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-700"
      >
        <Plus size={16} /> {addLabel}
      </button>
    </div>
  );
}

function StepCard({ n, icon: Icon, title, children }: { n: number; icon: typeof UserRound; title: string; children: ReactNode }) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{n}</span>
        <Icon size={20} className="text-blue-600" aria-hidden />
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      {children}
    </Card>
  );
}

export default function Plan({ openUni }: { openUni: (id: string) => void }) {
  const { t } = useLang();
  const [p, setP] = useState<Profile>(loadProfile);
  useEffect(() => saveProfile(p), [p]);
  const set = (patch: Partial<Profile>) => setP((x) => ({ ...x, ...patch }));

  const qual = QUALS.find((q) => q.id === p.qual)!;
  const gq = GCSE_QUALS.find((q) => q.id === p.gcseQual)!;
  const toggle = <T,>(list: T[], v: T, max = 99) => (list.includes(v) ? list.filter((x) => x !== v) : list.length < max ? [...list, v] : list);

  const score = studentScore(p);
  const gcse = gcseSummary(p);
  const shown = useMemo(() => coursesToShow(p), [p]);
  const results = useMemo(() => recommend(p, shown.ids), [p, shown.ids]);
  const aLevels = useMemo(() => (p.stage === "gcse" ? suggestALevels(p, shown.ids) : []), [p, shown.ids]);

  const feeOpts: { v: FeeType; l: L }[] = [
    { v: "home", l: { en: "UK home student", zh: "英国本地生" } },
    { v: "scottish", l: { en: "Scottish home student", zh: "苏格兰本地生" } },
    { v: "intl", l: { en: "International student", zh: "国际生" } },
  ];
  const regionOpts: { v: Region; l: L }[] = [
    { v: "london", l: { en: "London", zh: "伦敦" } },
    { v: "england", l: { en: "Rest of England", zh: "英格兰其他地区" } },
    { v: "scotland", l: { en: "Scotland", zh: "苏格兰" } },
    { v: "wales_ni", l: { en: "Wales / N. Ireland", zh: "威尔士 / 北爱尔兰" } },
  ];
  const settingOpts: { v: Setting; l: L }[] = [
    { v: "any", l: { en: "No preference", zh: "都可以" } },
    { v: "campus", l: { en: "Campus", zh: "独立校园" } },
    { v: "city", l: { en: "City", zh: "城市" } },
    { v: "collegiate", l: { en: "Collegiate", zh: "学院制" } },
  ];

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 p-6 text-white sm:p-10">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-100">
          <Sparkles size={16} /> {t({ en: "Personalised", zh: "个性化推荐" })}
        </div>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{t({ en: "My plan", zh: "我的升学规划" })}</h2>
        <p className="mt-3 max-w-2xl text-blue-50">
          {t({
            en: "Tell us your GCSEs, your sixth-form subjects and predicted grades, and what you're curious about. We'll suggest courses, universities and careers — and flag any subject gaps.",
            zh: "填写你的 GCSE、高中科目和预估成绩，以及你感兴趣的方向。我们会推荐专业、大学和职业方向，并提醒你缺少哪些必修科目。",
          })}
        </p>
        <p className="mt-3 text-sm text-blue-100">
          {t({ en: "Everything stays on this device — nothing is sent anywhere.", zh: "所有信息只保存在你这台设备上，不会上传到任何地方。" })}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-5">
          <StepCard n={1} icon={UserRound} title={t({ en: "About you", zh: "基本信息" })}>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">{t({ en: "First name (optional)", zh: "名字（可选）" })}</span>
                <input
                  value={p.name}
                  onChange={(e) => set({ name: e.target.value.slice(0, 40) })}
                  className="mt-1 min-h-[44px] w-full rounded-xl border border-slate-300 px-3 text-base"
                />
              </label>
              <div>
                <div className="text-sm font-medium text-slate-700">{t({ en: "Where are you now?", zh: "你现在在哪个阶段？" })}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  <ToggleChip on={p.stage === "gcse"} onClick={() => set({ stage: "gcse" })}>
                    {t({ en: "Doing GCSEs / IGCSEs", zh: "正在读 GCSE / IGCSE" })}
                  </ToggleChip>
                  <ToggleChip on={p.stage === "sixth"} onClick={() => set({ stage: "sixth" })}>
                    {t({ en: "In sixth form / IB", zh: "正在读 A-Level / IB 等" })}
                  </ToggleChip>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-700">{t({ en: "Fee status (best guess)", zh: "学费身份（大致判断）" })}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {feeOpts.map((o) => (
                    <ToggleChip key={o.v} on={p.feeType === o.v} onClick={() => set({ feeType: o.v })}>
                      {t(o.l)}
                    </ToggleChip>
                  ))}
                </div>
              </div>
            </div>
          </StepCard>

          <StepCard n={2} icon={BookOpen} title={t({ en: "GCSEs / IGCSEs", zh: "GCSE / IGCSE 成绩" })}>
            <div className="mb-3 flex flex-wrap gap-2">
              {GCSE_QUALS.map((q) => (
                <ToggleChip key={q.id} on={p.gcseQual === q.id} onClick={() => set({ gcseQual: q.id })}>
                  {t(q.name)}
                </ToggleChip>
              ))}
            </div>
            <p className="mb-3 text-sm text-slate-500">
              {p.stage === "gcse"
                ? t({ en: "Use predicted or mock grades.", zh: "可填预估成绩或模拟考成绩。" })
                : t({ en: "Add your results (or predictions).", zh: "填写你的成绩（或预估）。" })}
            </p>
            <SubjectRows rows={p.gcses} onChange={(gcses) => set({ gcses })} boards={gq.boards} grades={gq.grades} addLabel={t({ en: "Add a GCSE subject", zh: "添加 GCSE 科目" })} />
            {p.gcses.length === 0 && (
              <button
                type="button"
                onClick={() =>
                  set({
                    gcses: (["maths", "english_lang", "english_lit", "biology", "chemistry", "physics"] as SubjectId[]).map((s) => ({
                      subject: s,
                      board: gq.boards[0],
                      grade: "7",
                    })),
                  })
                }
                className="mt-2 min-h-[44px] text-sm font-medium text-blue-700 hover:underline"
              >
                {t({ en: "+ Start with the core subjects", zh: "+ 先添加核心科目" })}
              </button>
            )}
          </StepCard>

          {p.stage === "sixth" && (
            <StepCard n={3} icon={GraduationCap} title={t({ en: "Sixth-form subjects & predicted grades", zh: "高中科目与预估成绩" })}>
              <div className="mb-3 flex flex-wrap gap-2">
                {QUALS.map((q) => (
                  <ToggleChip key={q.id} on={p.qual === q.id} onClick={() => set({ qual: q.id })}>
                    {t(q.name)}
                  </ToggleChip>
                ))}
              </div>
              {p.qual === "ib" && (
                <label className="mb-3 block">
                  <span className="text-sm font-medium text-slate-700">{t({ en: "Predicted IB total (out of 45)", zh: "IB 预估总分（满分 45）" })}</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={24}
                    max={45}
                    value={p.ibTotal || ""}
                    onChange={(e) => set({ ibTotal: Math.min(45, Math.max(0, Number(e.target.value))) })}
                    className="mt-1 min-h-[44px] w-32 rounded-xl border border-slate-300 px-3 text-base"
                  />
                </label>
              )}
              <p className="mb-3 text-sm text-slate-500">
                {p.qual === "ib"
                  ? t({ en: "Add your Higher Level subjects so we can check course requirements.", zh: "请添加你的高级（HL）科目，用于核对专业要求。" })
                  : p.qual === "scottish"
                    ? t({ en: "Add your Highers (best five count).", zh: "添加你的 Highers 科目（按最好的 5 门计算）。" })
                    : t({ en: "Add each subject with its exam board and predicted grade.", zh: "逐一添加科目、考试局和预估成绩。" })}
              </p>
              <SubjectRows rows={p.subjects} onChange={(subjects) => set({ subjects })} boards={qual.boards} grades={qual.grades} addLabel={t({ en: "Add a subject", zh: "添加科目" })} />
            </StepCard>
          )}

          <StepCard n={p.stage === "sixth" ? 4 : 3} icon={Sparkles} title={t({ en: "What interests you?", zh: "你对什么感兴趣？" })}>
            <p className="mb-2 text-sm text-slate-500">{t({ en: "Pick up to 4 courses — or leave empty and we'll suggest some.", zh: "最多选 4 个专业，也可以不选，我们会根据成绩推荐。" })}</p>
            <CoursePicker selected={p.interests} onToggle={(id) => set({ interests: toggle(p.interests, id, 4) })} />
            <p className="mb-2 mt-5 text-sm text-slate-500">{t({ en: "Any careers in mind? (optional)", zh: "有想做的职业吗？（可选）" })}</p>
            <div className="flex flex-wrap gap-2">
              {CAREERS.map((c) => (
                <ToggleChip key={c.id} on={p.careers.includes(c.id)} onClick={() => set({ careers: toggle(p.careers, c.id, 3) })}>
                  {t(c.name)}
                </ToggleChip>
              ))}
            </div>
          </StepCard>

          <StepCard n={p.stage === "sixth" ? 5 : 4} icon={Briefcase} title={t({ en: "Preferences", zh: "偏好" })}>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-slate-700">{t({ en: "Where? (leave empty for anywhere)", zh: "地区（不选表示都可以）" })}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {regionOpts.map((o) => (
                    <ToggleChip key={o.v} on={p.regions.includes(o.v)} onClick={() => set({ regions: toggle(p.regions, o.v) })}>
                      {t(o.l)}
                    </ToggleChip>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-700">{t({ en: "Type of university", zh: "大学类型" })}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {settingOpts.map((o) => (
                    <ToggleChip key={o.v} on={p.setting === o.v} onClick={() => set({ setting: o.v })}>
                      {t(o.l)}
                    </ToggleChip>
                  ))}
                </div>
              </div>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">{t({ en: "Max total cost per year (£, optional)", zh: "每年总花费上限（£，可选）" })}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1000}
                  value={p.budget || ""}
                  placeholder={t({ en: "No limit", zh: "不限" })}
                  onChange={(e) => set({ budget: Math.max(0, Number(e.target.value)) })}
                  className="mt-1 min-h-[44px] w-48 rounded-xl border border-slate-300 px-3 text-base"
                />
                <span className="mt-1 block text-xs text-slate-500">{t({ en: "Tuition + estimated rent and living costs.", zh: "学费 + 估算的房租和生活费。" })}</span>
              </label>
            </div>
          </StepCard>

          <button
            type="button"
            onClick={() => {
              clearProfile();
              setP(EMPTY_PROFILE);
            }}
            className="flex min-h-[44px] items-center gap-2 text-sm font-medium text-slate-500 hover:text-rose-600"
          >
            <RotateCcw size={16} /> {t({ en: "Clear my answers", zh: "清空我的填写" })}
          </button>
        </div>

        <div className="space-y-5">
          <Summary p={p} score={score} gcse={gcse} />
          {p.stage === "gcse" && <ALevelAdvice suggestions={aLevels} courseIds={shown.ids} />}
          {shown.suggested && shown.ids.length > 0 && (
            <Callout>
              {t({
                en: "You haven't picked any interests yet, so these courses are suggested from your strongest subjects.",
                zh: "你还没选兴趣方向，下面的专业是根据你最强的科目推荐的。",
              })}
            </Callout>
          )}
          {shown.ids.length === 0 && (
            <Card className="text-center text-slate-500">
              {t({ en: "Add some subjects or pick an interest to see recommendations.", zh: "添加科目或选择兴趣方向后，这里会显示推荐结果。" })}
            </Card>
          )}
          {results.map((r) => (
            <CourseResultCard key={r.course.id} r={r} p={p} openUni={openUni} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Summary({ p, score, gcse }: { p: Profile; score: number | null; gcse: ReturnType<typeof gcseSummary> }) {
  const { t } = useLang();
  const hello = p.name ? t({ en: `Hi ${p.name} 👋`, zh: `${p.name}，你好 👋` }) : t({ en: "Your snapshot", zh: "你的概况" });
  const notes: { tone: "green" | "amber"; text: L }[] = [];
  if (gcse) {
    if (gcse.top >= 6) notes.push({ tone: "green", text: { en: `${gcse.top} GCSEs at grade 8–9 — strong for competitive courses.`, zh: `${gcse.top} 门 GCSE 达到 8–9 分，对竞争激烈的专业很有利。` } });
    if (gcse.maths !== null && gcse.maths < 6)
      notes.push({ tone: "amber", text: { en: "Many maths-related degrees want at least a 6–7 in GCSE Maths.", zh: "很多数学相关专业要求 GCSE 数学至少 6–7 分。" } });
    if (gcse.english !== null && gcse.english < 4)
      notes.push({ tone: "amber", text: { en: "Most universities need at least a 4 in GCSE English.", zh: "大多数大学要求 GCSE 英语至少 4 分。" } });
  }
  if (p.stage === "sixth" && p.subjects.some((x) => OFTEN_NOT_COUNTED.includes(x.subject)))
    notes.push({
      tone: "amber",
      text: {
        en: "Some universities don't count Thinking Skills or Global Perspectives as one of your three A-levels — check each course page.",
        zh: "部分大学不把思维技能或全球视野算作三门 A-Level 之一，请查看各专业页面。",
      },
    });
  if (p.stage === "sixth" && p.qual !== "ib" && p.subjects.length > 0 && p.subjects.length < 3)
    notes.push({ tone: "amber", text: { en: "Add at least three subjects to see how your grades compare.", zh: "请至少添加三门科目，才能比较你的成绩。" } });

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50">
      <div className="text-lg font-semibold text-slate-900">{hello}</div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <div className="text-xs text-slate-500">{t({ en: "Predicted grades (A-level equivalent)", zh: "预估成绩（折合 A-Level）" })}</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{score !== null ? scoreToGrades(score) : "—"}</div>
          {score !== null && p.qual !== "alevel" && p.qual !== "cie" && p.qual !== "ial" && (
            <div className="text-xs text-slate-500">{t({ en: "Rough conversion — check each course", zh: "粗略换算，请以专业要求为准" })}</div>
          )}
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <div className="text-xs text-slate-500">{t({ en: "GCSE average", zh: "GCSE 平均分" })}</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{gcse ? gcse.avg.toFixed(1) : "—"}</div>
          {gcse && <div className="text-xs text-slate-500">{t({ en: `${gcse.count} subjects`, zh: `共 ${gcse.count} 门` })}</div>}
        </div>
      </div>
      {notes.length > 0 && (
        <ul className="mt-3 space-y-2">
          {notes.map((n, i) => (
            <li key={i} className={`flex gap-2 text-sm ${n.tone === "green" ? "text-emerald-700" : "text-amber-800"}`}>
              {n.tone === "green" ? <CheckCircle2 size={18} className="shrink-0" /> : <CircleAlert size={18} className="shrink-0" />}
              {t(n.text)}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function ALevelAdvice({ suggestions, courseIds }: { suggestions: ReturnType<typeof suggestALevels>; courseIds: CourseId[] }) {
  const { t } = useLang();
  if (suggestions.length === 0) return null;
  const reasonLabel = {
    required: { label: { en: "Needed", zh: "必需" }, tone: "blue" as Tone },
    helpful: { label: { en: "Helpful", zh: "有帮助" }, tone: "violet" as Tone },
    strength: { label: { en: "Your strength", zh: "你的强项" }, tone: "green" as Tone },
  };
  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-900">{t({ en: "A-level subjects to consider", zh: "建议考虑的 A-Level 科目" })}</h3>
      <p className="mt-1 text-sm text-slate-500">
        {t({ en: "Based on: ", zh: "依据：" })}
        {courseIds.map((c) => t(courseById(c).name)).join(" · ")}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <li key={s.subject} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <span className="font-medium text-slate-800">{t(subjectName(s.subject))}</span>
            <Pill tone={reasonLabel[s.reason].tone}>{t(reasonLabel[s.reason].label)}</Pill>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-slate-600">
        {t({
          en: "Most students take three A-levels (four with Further Maths). Universities treat AQA, Edexcel, OCR, Eduqas and international boards (CIE, Pearson IAL, OxfordAQA) the same — your school usually picks the board.",
          zh: "大多数学生读 3 门 A-Level（加进阶数学可读 4 门）。大学对 AQA、Edexcel、OCR、Eduqas 以及国际考试局（CIE、Pearson IAL、OxfordAQA）一视同仁，考试局通常由学校决定。",
        })}
      </p>
    </Card>
  );
}

function CourseResultCard({ r, p, openUni }: { r: CourseResult; p: Profile; openUni: (id: string) => void }) {
  const { t } = useLang();
  const [showAll, setShowAll] = useState(false);
  const missing = r.reqs.filter((x) => !x.met);
  const bandsOrder: Band[] = ["reach", "match", "safer", "longshot"];
  const hasBands = r.matches.some((m) => m.band);
  const byBand = (b: Band) => r.matches.filter((m) => m.band === b);
  const offeringCount = UNIVERSITIES.filter((u) => offers(u, r.course)).length;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t(r.course.name)}</h3>
          <p className="mt-1 text-sm text-slate-600">{t(r.course.blurb)}</p>
        </div>
      </div>

      {p.stage === "sixth" && r.reqs.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {r.reqs.map((x, i) => (
            <div key={i} className={`flex items-start gap-2 text-sm ${x.met ? "text-emerald-700" : x.req.strictness === "required" ? "text-rose-700" : "text-amber-800"}`}>
              {x.met ? <CheckCircle2 size={18} className="shrink-0" /> : <CircleAlert size={18} className="shrink-0" />}
              <span>
                {x.met ? t({ en: "You have: ", zh: "已满足：" }) : x.req.strictness === "required" ? t({ en: "Required: ", zh: "必需：" }) : t({ en: "Usually expected: ", zh: "通常要求：" })}
                {t(x.req.label)}
              </span>
            </div>
          ))}
          {missing.some((x) => x.req.strictness === "required") && (
            <Callout tone="amber">
              {t({
                en: "You're missing a required subject, so most universities won't accept you for this course yet. Consider a foundation year, an alternative course, or changing a subject if it's still early.",
                zh: "你缺少必修科目，大多数大学暂时不会录取你读这个专业。可以考虑预科、相近专业，或在时间允许时调整选科。",
              })}
            </Callout>
          )}
        </div>
      )}

      {(r.course.tests || r.course.extra) && (
        <div className="mt-3 space-y-1 text-sm text-slate-600">
          {r.course.tests && (
            <p>
              <b>{t({ en: "Tests: ", zh: "考试：" })}</b>
              {t(r.course.tests)}
            </p>
          )}
          {r.course.extra && <p>{t(r.course.extra)}</p>}
        </div>
      )}

      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <h4 className="font-semibold text-slate-900">{t({ en: "Universities to look at", zh: "可以考虑的大学" })}</h4>
          <span className="text-xs text-slate-500">
            {t({ en: `${r.matches.length} of ${offeringCount} on our list`, zh: `本站 ${offeringCount} 所中的 ${r.matches.length} 所` })}
          </span>
        </div>
        {r.filteredOut > 0 && (
          <p className="mb-2 text-xs text-slate-500">
            {t({ en: `${r.filteredOut} hidden by your location / type / budget filters.`, zh: `有 ${r.filteredOut} 所因地区、类型或预算筛选被隐藏。` })}
          </p>
        )}
        {r.matches.length === 0 && <p className="text-sm text-slate-500">{t({ en: "No matches with your current filters.", zh: "当前筛选条件下没有匹配结果。" })}</p>}

        {hasBands ? (
          <div className="space-y-4">
            {bandsOrder.map((b) => {
              const list = byBand(b);
              if (list.length === 0 || (b === "longshot" && !showAll)) return null;
              return (
                <div key={b}>
                  <div className="mb-2 flex items-center gap-2">
                    <Pill tone={BAND_INFO[b].tone}>{t(BAND_INFO[b].label)}</Pill>
                    <span className="text-xs text-slate-500">{t(BAND_INFO[b].hint)}</span>
                  </div>
                  <UniStrip items={(showAll ? list : list.slice(0, 4)).map((m) => ({ uni: m.uni, offer: m.offer, cost: m.cost }))} openUni={openUni} />
                </div>
              );
            })}
            {(r.matches.length > 12 || byBand("longshot").length > 0) && (
              <button type="button" onClick={() => setShowAll(!showAll)} className="min-h-[44px] text-sm font-medium text-blue-700 hover:underline">
                {showAll ? t({ en: "Show fewer", zh: "收起" }) : t({ en: "Show all, including long shots", zh: "显示全部（包括难度较大的）" })}
              </button>
            )}
          </div>
        ) : (
          <UniStrip items={r.matches.slice(0, showAll ? 99 : 8).map((m) => ({ uni: m.uni, offer: m.offer, cost: m.cost }))} openUni={openUni} />
        )}
        <p className="mt-3 text-xs text-slate-500">
          {t({
            en: "“Typical offer” is our estimate for this subject area from each university's usual range — always check the exact course page.",
            zh: "“常见要求”是根据各校常见录取范围对该专业的估算，具体请以专业页面为准。",
          })}
        </p>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <h4 className="font-semibold text-slate-900">{t({ en: "Where it can lead", zh: "可以通向的职业" })}</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {r.course.careers.map((id) => {
            const c = careerById(id);
            return c ? (
              <Pill key={id} tone="violet">
                {t(c.name)}
              </Pill>
            ) : null;
          })}
        </div>
        <p className="mt-2 text-sm text-slate-600">
          <b>{t({ en: "Suits: ", zh: "适合：" })}</b>
          {t(r.course.suits)}
        </p>
      </div>
    </Card>
  );
}

function UniStrip({ items, openUni }: { items: { uni: University; offer: number; cost: number }[]; openUni: (id: string) => void }) {
  const { t } = useLang();
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map(({ uni, offer, cost }) => (
        <button
          key={uni.id}
          type="button"
          onClick={() => openUni(uni.id)}
          className="flex min-h-[64px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 text-left transition hover:border-blue-400 hover:shadow-sm"
        >
          <UniPhoto photo={uni.photo} alt={uni.name} width={160} className="h-14 w-16 shrink-0 rounded-lg" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">{uni.name}</div>
            <div className="text-xs text-slate-500">
              {t({ en: "Typical offer ≈ ", zh: "常见要求 ≈ " })}
              <b className="text-slate-700">{scoreToGrades(offer)}</b> · {gbp(cost)}
              {t({ en: "/yr", zh: "/年" })}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function CoursePicker({ selected, onToggle }: { selected: CourseId[]; onToggle: (id: CourseId) => void }) {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const searching = q.trim().length > 0;
  return (
    <div className="space-y-3">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onToggle(id)}
              className="flex min-h-[40px] items-center gap-1 rounded-full bg-blue-600 px-3 text-sm font-medium text-white"
            >
              {t(courseById(id).name)} <X size={14} aria-label={t({ en: "remove", zh: "移除" })} />
            </button>
          ))}
        </div>
      )}
      <label className="relative block">
        <span className="sr-only">{t({ en: "Search courses", zh: "搜索专业" })}</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t({ en: `Search ${COURSES.length} courses, e.g. real estate`, zh: `搜索 ${COURSES.length} 个专业，例如 real estate` })}
          className="min-h-[44px] w-full rounded-xl border border-slate-300 pl-9 pr-3 text-base"
        />
      </label>
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
        {GROUPS.filter((g) => g.id !== "all").map((g) => {
          const items = COURSES.filter((c) => c.group === g.id && matchesCourse(c, q));
          if (items.length === 0) return null;
          const isOpen = searching || open === g.id;
          const picked = items.filter((c) => selected.includes(c.id)).length;
          return (
            <div key={g.id}>
              <button
                type="button"
                onClick={() => setOpen(isOpen && !searching ? null : g.id)}
                aria-expanded={isOpen}
                className="flex min-h-[44px] w-full items-center justify-between px-3 text-left text-sm font-medium text-slate-700"
              >
                <span>
                  {t(g.label)} <span className="text-slate-400">({items.length})</span>
                  {picked > 0 && <span className="ml-2 rounded-full bg-blue-100 px-2 text-xs text-blue-700">{picked}</span>}
                </span>
                <ChevronDown size={16} className={`transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="flex flex-wrap gap-2 px-3 pb-3">
                  {items.map((c) => (
                    <ToggleChip key={c.id} on={selected.includes(c.id)} onClick={() => onToggle(c.id)}>
                      {t(c.name)}
                    </ToggleChip>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
