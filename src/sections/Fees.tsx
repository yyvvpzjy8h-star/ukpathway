import { useState } from "react";
import { gbp, useLang, type L } from "../i18n";
import { HOME_FEE, STUDENT_FINANCE } from "../data/facts";
import { UNIVERSITIES } from "../data/universities";
import { Callout, Card, ExtLink, FeeStatusPill, SectionTitle } from "../components/ui";
import { intlFeeText } from "./Universities";

type Answer = "yes" | "no" | null;

function FeeStatusChecker() {
  const { t } = useLang();
  const [status, setStatus] = useState<Answer>(null);
  const [resident, setResident] = useState<Answer>(null);

  const q = (label: L, hint: L, value: Answer, set: (a: Answer) => void) => (
    <fieldset className="space-y-2">
      <legend className="font-medium text-slate-900">{t(label)}</legend>
      <p className="text-sm text-slate-500">{t(hint)}</p>
      <div className="flex gap-2">
        {(["yes", "no"] as const).map((a) => (
          <button
            key={a}
            onClick={() => set(a)}
            aria-pressed={value === a}
            className={`min-h-[44px] min-w-[88px] rounded-xl px-4 text-sm font-medium transition ${
              value === a ? "bg-blue-600 text-white" : "border border-slate-300 bg-white text-slate-700 hover:border-blue-400"
            }`}
          >
            {a === "yes" ? t({ en: "Yes", zh: "是" }) : t({ en: "No", zh: "否" })}
          </button>
        ))}
      </div>
    </fieldset>
  );

  let result: { tone: "blue" | "amber"; text: L } | null = null;
  if (status === "yes" && resident === "yes")
    result = {
      tone: "blue",
      text: {
        en: "You'll most likely be assessed as a Home student. Your university makes the final decision.",
        zh: "你很可能被认定为本地生（Home）。最终由大学审核决定。",
      },
    };
  else if (status === "yes" && resident === "no")
    result = {
      tone: "amber",
      text: {
        en: "It depends. Some UK nationals returning from abroad still qualify (for example after living in the EEA/Switzerland, or if a parent works abroad temporarily). Ask the university's fee assessment team early.",
        zh: "不一定。部分从海外回来的英国公民仍可能算本地生（例如之前住在欧洲经济区/瑞士，或父母只是暂时外派）。请尽早联系大学的学费身份审核部门。",
      },
    };
  else if (status === "no")
    result = {
      tone: "amber",
      text: {
        en: "You'll most likely pay international fees. Exceptions exist — for example refugees and some humanitarian routes, or long residence for young people. Check UKCISA's guidance.",
        zh: "你很可能需要交国际生学费。但也有例外，例如难民、部分人道主义签证，或在英国长期居住的年轻人。请查看 UKCISA 的说明。",
      },
    };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-900">{t({ en: "Quick fee status check (England)", zh: "学费身份快速自测（英格兰）" })}</h3>
      <p className="mt-1 text-sm text-slate-500">
        {t({ en: "A rough guide only — not an official assessment.", zh: "仅供粗略参考，不是官方认定。" })}
      </p>
      <div className="mt-4 space-y-5">
        {q(
          { en: "1. Are you a UK or Irish citizen, or do you have settled status / indefinite leave to remain (or EUSS pre-settled status)?", zh: "1. 你是英国或爱尔兰公民吗？或者持有定居身份 / 永居（ILR），或欧盟定居计划的预定居身份？" },
          { en: "A Student visa or a parent's work-visa dependant status does not count.", zh: "学生签证、父母工作签证的家属签证都不算。" },
          status,
          setStatus,
        )}
        {status === "yes" &&
          q(
            { en: "2. Will you have lived in the UK for the full 3 years before your course starts — not mainly for education?", zh: "2. 到开学时，你是否已在英国连续住满 3 年，且主要目的不是读书？" },
            { en: "Irish citizens and EU nationals with pre-settled status can also count time in Ireland / the EEA / Switzerland.", zh: "爱尔兰公民和持预定居身份的欧盟公民，在爱尔兰、欧洲经济区、瑞士居住的时间也可以计入。" },
            resident,
            setResident,
          )}
        {result && <Callout tone={result.tone}>{t(result.text)}</Callout>}
        <ExtLink href="https://www.ukcisa.org.uk/student-advice/fees-and-money/england-fee-status/">
          {t({ en: "UKCISA: England fee status rules", zh: "UKCISA：英格兰学费身份规则" })}
        </ExtLink>
      </div>
    </Card>
  );
}

export default function Fees() {
  const { t } = useLang();
  return (
    <div className="space-y-8">
      <SectionTitle
        title={t({ en: "Home vs international fees", zh: "本地学费 vs 国际学费" })}
        subtitle={t({
          en: "Your fee status — not your nationality alone — decides what you pay. The gap is huge: £9,790 a year vs roughly £28,000–£70,000.",
          zh: "交多少学费取决于学费身份，而不只是国籍。两者差距很大：每年 £9,790，对比约 £2.8 万–£7 万。",
        })}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">{t({ en: "Home students", zh: "本地生（Home）" })}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <b>{t({ en: "England:", zh: "英格兰：" })}</b>{" "}
              {t({
                en: `capped at ${gbp(HOME_FEE.england2627)} in 2026/27 and ${gbp(HOME_FEE.england2728)} in 2027/28, then rising with inflation.`,
                zh: `2026/27 上限 ${gbp(HOME_FEE.england2627)}，2027/28 上限 ${gbp(HOME_FEE.england2728)}，之后随通胀上涨。`,
              })}
            </li>
            <li>
              <b>{t({ en: "Scotland:", zh: "苏格兰：" })}</b>{" "}
              {t({
                en: `free for eligible Scottish students (paid by SAAS). Students from the rest of the UK pay ${gbp(HOME_FEE.scotlandRuk2627)} (2026/27) — but degrees are usually 4 years.`,
                zh: `符合条件的苏格兰学生免学费（由 SAAS 支付）。英国其他地区学生交 ${gbp(HOME_FEE.scotlandRuk2627)}（2026/27），但本科通常读 4 年。`,
              })}
            </li>
            <li>
              <b>{t({ en: "Wales & Northern Ireland:", zh: "威尔士和北爱尔兰：" })}</b>{" "}
              {t({ en: "different caps and support — check Student Finance Wales / NI.", zh: "上限和资助政策不同，请查 Student Finance Wales / NI。" })}
            </li>
            <li>
              <b>{t({ en: "Tuition loan:", zh: "学费贷款：" })}</b>{" "}
              {t({ en: "covers the full fee, paid straight to the university. Not means-tested.", zh: "可贷全额学费，直接付给大学，不看家庭收入。" })}
            </li>
          </ul>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">{t({ en: "International students", zh: "国际生（International）" })}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>{t({ en: "Universities set their own fees, usually by course band. Lab subjects cost more; medicine costs most.", zh: "学费由大学自己定，通常按专业分档。实验类专业更贵，医学最贵。" })}</li>
            <li>{t({ en: "Fees often rise each year of your course (some universities, e.g. LSE and most UCL courses, fix them for the whole degree).", zh: "很多学校学费逐年上涨（部分学校如 LSE 和 UCL 大部分专业会锁定整个学位期间的学费）。" })}</li>
            <li>{t({ en: "No UK government tuition or maintenance loans. Look for university scholarships early.", zh: "不能申请英国政府的学费贷款和生活费贷款，奖学金要尽早查。" })}</li>
            <li>
              {t({
                en: "From August 2028, English universities pay a £925 levy per international student (above an allowance) — this may push fees up.",
                zh: "从 2028 年 8 月起，英格兰大学每招一名国际生（超出豁免名额部分）要交 £925 的税费，可能会推高学费。",
              })}
            </li>
          </ul>
        </Card>
      </div>

      <FeeStatusChecker />

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">{t({ en: "Fee comparison by university", zh: "各校学费对比" })}</h3>
        <Card className="overflow-x-auto !p-0">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">{t({ en: "University", zh: "大学" })}</th>
                <th className="p-3">{t({ en: "Home / yr", zh: "本地生/年" })}</th>
                <th className="p-3">{t({ en: "International / yr (2026/27 entry)", zh: "国际生/年（2026/27 入学）" })}</th>
                <th className="p-3">{t({ en: "Source", zh: "来源" })}</th>
              </tr>
            </thead>
            <tbody>
              {UNIVERSITIES.map((u) => (
                <tr key={u.id} className="border-b border-slate-100 last:border-0">
                  <td className="p-3 font-medium text-slate-900">
                    {u.name}
                    <div className="font-normal text-slate-500">{u.zhName}</div>
                  </td>
                  <td className="p-3">
                    {u.nation === "Scotland" ? t({ en: "£0 / £9,535*", zh: "£0 / £9,535*" }) : gbp(HOME_FEE.england2627)}
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{intlFeeText(u, t)}</div>
                    <div className="mt-1">
                      <FeeStatusPill status={u.intlFee.status} />
                    </div>
                  </td>
                  <td className="p-3">
                    <ExtLink href={u.feesUrl}>{t({ en: "Official", zh: "官网" })}</ExtLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <p className="mt-2 text-xs text-slate-500">
          {t({
            en: "* Scotland: £0 for eligible Scottish students, £9,535 for the rest of the UK. International figures are for 2026/27 entrants; 2027 entry is usually a few percent higher.",
            zh: "* 苏格兰：符合条件的苏格兰学生 £0，英国其他地区学生 £9,535。国际生学费为 2026/27 入学数据，2027 入学一般会高几个百分点。",
          })}
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">{t({ en: "Student finance in England (Home students)", zh: "英格兰学生贷款（本地生）" })}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Stat
            label={t({ en: "Max maintenance loan, outside London (2026/27)", zh: "最高生活费贷款，伦敦以外（2026/27）" })}
            value={`≈ ${gbp(STUDENT_FINANCE.maintenanceMaxOutsideLondon)}`}
          />
          <Stat
            label={t({ en: "Max maintenance loan, London (2026/27)", zh: "最高生活费贷款，伦敦（2026/27）" })}
            value={`≈ ${gbp(STUDENT_FINANCE.maintenanceMaxLondon)}`}
          />
          <Stat
            label={t({ en: "You repay (Plan 5)", zh: "还款方式（Plan 5）" })}
            value={t({
              en: `${STUDENT_FINANCE.plan5Rate}% of income over ${gbp(STUDENT_FINANCE.plan5Threshold)}`,
              zh: `收入超过 ${gbp(STUDENT_FINANCE.plan5Threshold)} 的部分还 ${STUDENT_FINANCE.plan5Rate}%`,
            })}
          />
        </div>
        <ul className="mt-4 space-y-1 text-sm text-slate-600">
          <li>{t({ en: "Maintenance loans are means-tested: the maximum is for the lowest household incomes.", zh: "生活费贷款看家庭收入，最高额度只给收入最低的家庭。" })}</li>
          <li>
            {t({
              en: `Repayments come out of your salary automatically; anything left is written off after ${STUDENT_FINANCE.plan5WriteOffYears} years.`,
              zh: `工作后从工资中自动扣款，${STUDENT_FINANCE.plan5WriteOffYears} 年后未还清部分自动免除。`,
            })}
          </li>
          <li>{t({ en: "Many universities also offer bursaries that you don't pay back.", zh: "很多大学还有不用还的助学金（bursary）。" })}</li>
        </ul>
        <div className="mt-2 flex flex-wrap gap-x-5">
          <ExtLink href="https://www.gov.uk/student-finance">GOV.UK – Student finance</ExtLink>
          <ExtLink href="https://www.gov.uk/repaying-your-student-loan">GOV.UK – Repaying</ExtLink>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-bold text-slate-900">{value}</div>
    </div>
  );
}
