import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang, type L } from "../i18n";
import { COURSES, type Course } from "../data/courses";
import { careerById } from "../data/careers";
import { subjectName } from "../data/subjects";
import { UNIVERSITIES } from "../data/universities";
import { offers } from "../lib/recommend";
import { Card, Pill, SectionTitle, ToggleChip } from "../components/ui";

const GROUPS: { id: Course["group"] | "all"; label: L }[] = [
  { id: "all", label: { en: "All", zh: "全部" } },
  { id: "health", label: { en: "Health", zh: "医疗健康" } },
  { id: "science", label: { en: "Sciences", zh: "理科" } },
  { id: "engineering", label: { en: "Engineering & Computing", zh: "工程与计算机" } },
  { id: "social", label: { en: "Social sciences, law & business", zh: "社科、法律与商科" } },
  { id: "humanities", label: { en: "Humanities", zh: "人文" } },
  { id: "creative", label: { en: "Creative", zh: "创意设计" } },
];

export default function Courses({ openUni }: { openUni: (id: string) => void }) {
  const { t } = useLang();
  const [group, setGroup] = useState<Course["group"] | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const list = COURSES.filter((c) => group === "all" || c.group === group);

  return (
    <div>
      <SectionTitle
        title={t({ en: "Courses", zh: "专业" })}
        subtitle={t({
          en: "What each subject is like, which A-levels you need, the tests involved, who it suits and where it leads.",
          zh: "每个专业学什么、需要哪些 A-Level、要考什么、适合什么样的人，以及毕业后能做什么。",
        })}
      />
      <div className="mb-5 flex flex-wrap gap-2">
        {GROUPS.map((g) => (
          <ToggleChip key={g.id} on={group === g.id} onClick={() => setGroup(g.id)}>
            {t(g.label)}
          </ToggleChip>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((c) => {
          const isOpen = open === c.id;
          const unis = UNIVERSITIES.filter((u) => offers(u, c));
          return (
            <Card key={c.id} className="!p-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : c.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-3 p-5 text-left"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{t(c.name)}</h3>
                  <p className="mt-1 text-sm text-slate-600">{t(c.blurb)}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.reqs.length === 0 ? (
                      <Pill tone="green">{t({ en: "No set A-levels", zh: "无指定 A-Level" })}</Pill>
                    ) : (
                      c.reqs.map((r, i) => (
                        <Pill key={i} tone={r.strictness === "required" ? "blue" : "violet"}>
                          {t(r.label)}
                        </Pill>
                      ))
                    )}
                  </div>
                </div>
                <ChevronDown size={20} className={`mt-1 shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="space-y-3 border-t border-slate-100 bg-slate-50/60 p-5 text-sm">
                  <p>
                    <b>{t({ en: "Suits: ", zh: "适合：" })}</b>
                    {t(c.suits)}
                  </p>
                  {c.helpful.length > 0 && (
                    <p>
                      <b>{t({ en: "Helpful subjects: ", zh: "有帮助的科目：" })}</b>
                      {c.helpful.map((s) => t(subjectName(s))).join(", ")}
                    </p>
                  )}
                  {c.tests && (
                    <p>
                      <b>{t({ en: "Tests: ", zh: "考试：" })}</b>
                      {t(c.tests)}
                    </p>
                  )}
                  {c.extra && <p>{t(c.extra)}</p>}
                  <div>
                    <b>{t({ en: "Careers: ", zh: "职业方向：" })}</b>
                    <span className="inline-flex flex-wrap gap-1.5 align-middle">
                      {c.careers.map((id) => {
                        const k = careerById(id);
                        return k ? (
                          <Pill key={id} tone="violet">
                            {t(k.name)}
                          </Pill>
                        ) : null;
                      })}
                    </span>
                  </div>
                  <div>
                    <b>{t({ en: `Offered at (${unis.length} on our list): `, zh: `开设院校（本站 ${unis.length} 所）：` })}</b>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {unis.map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => openUni(u.id)}
                          className="min-h-[36px] rounded-full border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:border-blue-400"
                        >
                          {u.name.replace("University of ", "").replace(" University", "")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
