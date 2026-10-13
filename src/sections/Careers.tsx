import { Hammer, Route } from "lucide-react";
import { useLang } from "../i18n";
import { CAREERS } from "../data/careers";
import { courseById } from "../data/courses";
import { Callout, Card, ExtLink, Pill, SectionTitle } from "../components/ui";

export default function Careers() {
  const { t } = useLang();
  return (
    <div>
      <SectionTitle
        title={t({ en: "Careers", zh: "职业" })}
        subtitle={t({
          en: "Start from the job and work backwards: the training route, the degrees that lead there, and whether an apprenticeship is an option.",
          zh: "从职业倒推：需要怎样的培训路线、哪些学位能通向它，以及是否可以走学徒制。",
        })}
      />
      <div className="mb-6">
        <Callout>
          {t({
            en: "Many graduate jobs accept any degree — employers in finance, consulting, law (solicitors), accountancy, teaching and the civil service hire from all subjects. Choose a course you'll enjoy and do well in.",
            zh: "很多毕业生岗位不限专业：金融、咨询、律师（Solicitor）、会计、教师和公务员都招各专业的毕业生。选一个你喜欢、也能学好的专业最重要。",
          })}
        </Callout>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {CAREERS.map((c) => (
          <Card key={c.id}>
            <h3 className="text-lg font-semibold text-slate-900">{t(c.name)}</h3>
            <p className="mt-1 text-sm text-slate-600">{t(c.blurb)}</p>
            <div className="mt-3 flex gap-2 rounded-xl bg-blue-50 p-3 text-sm text-blue-900">
              <Route size={18} className="mt-0.5 shrink-0" aria-hidden />
              <span>{t(c.route)}</span>
            </div>
            {c.apprenticeship && (
              <div className="mt-2 flex gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">
                <Hammer size={18} className="mt-0.5 shrink-0" aria-hidden />
                <span>{t(c.apprenticeship)}</span>
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.courses.map((id) => (
                <Pill key={id}>{t(courseById(id).name)}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-6">
        <ExtLink href="https://nationalcareers.service.gov.uk/">National Careers Service</ExtLink>
        <ExtLink href="https://www.prospects.ac.uk/">Prospects</ExtLink>
        <ExtLink href="https://www.gov.uk/apply-apprenticeship">GOV.UK – Apprenticeships</ExtLink>
      </div>
    </div>
  );
}
