import { gbp, useLang } from "../i18n";
import { VISA } from "../data/facts";
import { Callout, Card, ExtLink, SectionTitle } from "../components/ui";

export default function International() {
  const { t } = useLang();
  const steps = [
    { en: "Get an unconditional offer and a CAS (Confirmation of Acceptance for Studies) from the university.", zh: "拿到无条件录取和大学发的 CAS（录取确认函）。" },
    { en: "Prove your English (a Secure English Language Test or the university's own assessment, depending on your situation).", zh: "证明英语能力（根据情况提交认可的英语考试成绩或学校自己的评估）。" },
    { en: "Show you can pay your first year's fees plus living costs, held for 28 days.", zh: "证明你能支付第一年的学费和生活费，资金需存满 28 天。" },
    { en: "Apply online, pay the visa fee and health surcharge, and give your biometrics.", zh: "在线申请，缴纳签证费和医疗附加费，录入生物信息。" },
    { en: "Some science and engineering courses also need ATAS clearance — check your offer.", zh: "部分理工科专业还需要 ATAS 安全审查，请看你的 offer 说明。" },
  ];

  return (
    <div className="space-y-8">
      <SectionTitle
        title={t({ en: "International students", zh: "国际学生" })}
        subtitle={t({
          en: "What a Student visa costs, the money you need to show, and what happens after you graduate.",
          zh: "学生签证要花多少钱、需要证明多少资金，以及毕业后的去向。",
        })}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "Student visa fee (from 8 Apr 2026)", zh: "学生签证费（2026 年 4 月 8 日起）" })}</div>
          <div className="mt-1 text-2xl font-bold">{gbp(VISA.applicationFee)}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "Immigration Health Surcharge", zh: "移民医疗附加费（IHS）" })}</div>
          <div className="mt-1 text-2xl font-bold">
            {gbp(VISA.ihsPerYear)}
            <span className="text-base font-normal text-slate-500">{t({ en: " / year", zh: " / 年" })}</span>
          </div>
          <div className="text-xs text-slate-500">{t({ en: "Paid upfront for the whole visa", zh: "按整个签证期限一次性预付" })}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "Living funds to show — London", zh: "需证明生活费——伦敦" })}</div>
          <div className="mt-1 text-2xl font-bold">
            {gbp(VISA.fundsLondonPerMonth)}
            <span className="text-base font-normal text-slate-500">{t({ en: " / month", zh: " / 月" })}</span>
          </div>
          <div className="text-xs text-slate-500">
            {t({ en: `Up to ${VISA.fundsMonths} months = ${gbp(VISA.fundsLondonPerMonth * VISA.fundsMonths)}`, zh: `最多 ${VISA.fundsMonths} 个月 = ${gbp(VISA.fundsLondonPerMonth * VISA.fundsMonths)}` })}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "Living funds to show — elsewhere", zh: "需证明生活费——伦敦以外" })}</div>
          <div className="mt-1 text-2xl font-bold">
            {gbp(VISA.fundsOutsidePerMonth)}
            <span className="text-base font-normal text-slate-500">{t({ en: " / month", zh: " / 月" })}</span>
          </div>
          <div className="text-xs text-slate-500">
            {t({ en: `Up to ${VISA.fundsMonths} months = ${gbp(VISA.fundsOutsidePerMonth * VISA.fundsMonths)}`, zh: `最多 ${VISA.fundsMonths} 个月 = ${gbp(VISA.fundsOutsidePerMonth * VISA.fundsMonths)}` })}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">{t({ en: "Student visa — the steps", zh: "学生签证流程" })}</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {steps.map((s) => (
            <li key={s.en}>{t(s)}</li>
          ))}
        </ol>
        <div className="mt-2">
          <ExtLink href="https://www.gov.uk/student-visa">GOV.UK – Student visa</ExtLink>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">{t({ en: "After you graduate: the Graduate Route", zh: "毕业后：毕业生工作签证（Graduate Route）" })}</h3>
        <p className="mt-2 text-sm text-slate-700">
          {t({
            en: "The Graduate visa lets you stay and work (or look for work) without a sponsor. For applications made on or after 1 January 2027, bachelor's and master's graduates get 18 months instead of 2 years. PhD graduates keep 3 years. Students starting in 2027 will graduate under the 18-month rule.",
            zh: "毕业生签证允许你无需雇主担保就留在英国工作或找工作。2027 年 1 月 1 日及以后提交的申请，本科和硕士毕业生只能拿到 18 个月（原为 2 年），博士仍为 3 年。2027 年入学的学生毕业时将适用 18 个月的新规则。",
          })}
        </p>
        <div className="mt-2">
          <ExtLink href="https://www.gov.uk/graduate-visa">GOV.UK – Graduate visa</ExtLink>
        </div>
      </Card>

      <Callout tone="amber">
        {t({
          en: "Immigration rules and fees change often. Always confirm on GOV.UK before you apply, and use your university's international student advice team — it's free.",
          zh: "签证政策和费用经常变化，申请前请务必在 GOV.UK 上确认。也可以免费咨询大学的国际学生顾问团队。",
        })}
      </Callout>
    </div>
  );
}
