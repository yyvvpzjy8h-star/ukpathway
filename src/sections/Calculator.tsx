import { useMemo, useState } from "react";
import { gbp, useLang, type L } from "../i18n";
import { VISA } from "../data/facts";
import { UNIVERSITIES, homeFeeFor } from "../data/universities";
import { Callout, Card, SectionTitle } from "../components/ui";

type Status = "home" | "scottish" | "intl";

function NumberField({ label, hint, value, onChange, step = 1 }: { label: string; hint?: string; value: number; onChange: (n: number) => void; step?: number }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="mt-1 min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export default function Calculator() {
  const { t } = useLang();
  const [uniId, setUniId] = useState(UNIVERSITIES[0].id);
  const uni = UNIVERSITIES.find((u) => u.id === uniId)!;
  const [status, setStatus] = useState<Status>("home");
  const [tuition, setTuition] = useState(homeFeeFor(uni, false));
  const [years, setYears] = useState(uni.degreeYears);
  const [feeRise, setFeeRise] = useState(3);
  const [rent, setRent] = useState(uni.london ? 230 : 170);
  const [rentWeeks, setRentWeeks] = useState(44);
  const [living, setLiving] = useState(uni.london ? 600 : 500);
  const [livingMonths, setLivingMonths] = useState(10);
  const [rate, setRate] = useState<number>(0);

  const resetFor = (id: string, s: Status) => {
    const u = UNIVERSITIES.find((x) => x.id === id)!;
    setTuition(s === "intl" ? u.calcIntlDefault : homeFeeFor(u, s === "scottish"));
    setYears(u.degreeYears);
    setRent(u.london ? 230 : 170);
    setLiving(u.london ? 600 : 500);
  };

  const r = useMemo(() => {
    const perYear: { tuition: number; living: number }[] = [];
    for (let y = 0; y < years; y++) {
      perYear.push({
        tuition: tuition * Math.pow(1 + feeRise / 100, y),
        living: rent * rentWeeks + living * livingMonths,
      });
    }
    const visa = status === "intl" ? VISA.applicationFee + VISA.ihsPerYear * (years + 0.5) : 0;
    const totalTuition = perYear.reduce((a, b) => a + b.tuition, 0);
    const totalLiving = perYear.reduce((a, b) => a + b.living, 0);
    return { perYear, visa, totalTuition, totalLiving, total: totalTuition + totalLiving + visa };
  }, [tuition, years, feeRise, rent, rentWeeks, living, livingMonths, status]);

  const statusOpts: { v: Status; l: L }[] = [
    { v: "home", l: { en: "Home (England / rest of UK)", zh: "本地生（英格兰 / 英国其他地区）" } },
    { v: "scottish", l: { en: "Home (Scottish student)", zh: "本地生（苏格兰学生）" } },
    { v: "intl", l: { en: "International", zh: "国际生" } },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        title={t({ en: "Cost calculator", zh: "费用计算器" })}
        subtitle={t({
          en: "Estimate the full cost of a degree. Every number is editable — replace the defaults with your course fee and real rent quotes.",
          zh: "估算读完整个学位的总花费。所有数字都可以修改，请换成你的专业学费和实际房租报价。",
        })}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">{t({ en: "University", zh: "大学" })}</span>
            <select
              value={uniId}
              onChange={(e) => {
                setUniId(e.target.value);
                resetFor(e.target.value, status);
              }}
              className="mt-1 min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3 text-base"
            >
              {UNIVERSITIES.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} · {u.zhName}
                </option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-slate-700">{t({ en: "Fee status", zh: "学费身份" })}</legend>
            <div className="mt-1 flex flex-wrap gap-2">
              {statusOpts.map((o) => (
                <button
                  key={o.v}
                  onClick={() => {
                    setStatus(o.v);
                    resetFor(uniId, o.v);
                  }}
                  aria-pressed={status === o.v}
                  className={`min-h-[44px] rounded-xl px-4 text-sm font-medium transition ${
                    status === o.v ? "bg-blue-600 text-white" : "border border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                  }`}
                >
                  {t(o.l)}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-3">
            <NumberField
              label={t({ en: "Tuition, first year (£)", zh: "第一年学费（£）" })}
              hint={
                status === "intl"
                  ? t({ en: "Default is a rough estimate — enter your course's fee", zh: "默认值只是粗略估计，请填你的专业学费" })
                  : undefined
              }
              value={tuition}
              onChange={setTuition}
              step={100}
            />
            <NumberField label={t({ en: "Years of study", zh: "学习年数" })} value={years} onChange={(n) => setYears(Math.min(7, Math.max(1, Math.round(n))))} />
            <NumberField label={t({ en: "Fee rise per year (%)", zh: "学费每年涨幅（%）" })} value={feeRise} onChange={setFeeRise} step={0.5} />
            <NumberField
              label={t({ en: "Rent per week (£)", zh: "每周房租（£）" })}
              hint={t({ en: "Estimate — check halls prices", zh: "估计值，请查宿舍价格" })}
              value={rent}
              onChange={setRent}
              step={5}
            />
            <NumberField label={t({ en: "Weeks of rent per year", zh: "每年租房周数" })} value={rentWeeks} onChange={setRentWeeks} />
            <NumberField
              label={t({ en: "Other living costs per month (£)", zh: "每月其他生活费（£）" })}
              hint={t({ en: "Food, transport, phone, books, social", zh: "吃饭、交通、话费、书本、社交" })}
              value={living}
              onChange={setLiving}
              step={25}
            />
            <NumberField label={t({ en: "Months per year", zh: "每年月数" })} value={livingMonths} onChange={setLivingMonths} />
            <NumberField
              label={t({ en: "£1 = ? CNY (optional)", zh: "£1 = ? 人民币（可选）" })}
              hint={t({ en: "Enter today's rate to see RMB", zh: "填入当日汇率即可显示人民币" })}
              value={rate}
              onChange={setRate}
              step={0.01}
            />
          </div>
        </Card>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50">
            <div className="text-sm text-slate-600">{t({ en: "Estimated total for the degree", zh: "整个学位预计总花费" })}</div>
            <div className="mt-1 text-4xl font-bold text-slate-900">{gbp(r.total)}</div>
            {rate > 0 && <div className="mt-1 text-lg text-slate-700">≈ ¥{Math.round(r.total * rate).toLocaleString("zh-CN")}</div>}
            <dl className="mt-4 space-y-2 text-sm">
              <Row label={t({ en: "Tuition", zh: "学费" })} value={gbp(r.totalTuition)} />
              <Row label={t({ en: "Rent + living", zh: "房租 + 生活费" })} value={gbp(r.totalLiving)} />
              {status === "intl" && <Row label={t({ en: "Visa + health surcharge", zh: "签证费 + 医疗附加费" })} value={gbp(r.visa)} />}
            </dl>
          </Card>
          <Card>
            <div className="mb-2 text-sm font-semibold text-slate-700">{t({ en: "Per year", zh: "每年" })}</div>
            <ul className="space-y-1 text-sm">
              {r.perYear.map((y, i) => (
                <li key={i} className="flex justify-between">
                  <span className="text-slate-500">{t({ en: `Year ${i + 1}`, zh: `第 ${i + 1} 年` })}</span>
                  <span className="font-medium">{gbp(y.tuition + y.living)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Callout>
        {status === "intl"
          ? t({
              en: `Visa estimate = application fee ${gbp(VISA.applicationFee)} + Immigration Health Surcharge ${gbp(VISA.ihsPerYear)}/year for the course plus a few months. Flights, deposits and insurance are not included.`,
              zh: `签证估算 = 申请费 ${gbp(VISA.applicationFee)} + 移民医疗附加费 ${gbp(VISA.ihsPerYear)}/年（按课程时长再加几个月计算）。不含机票、押金和保险。`,
            })
          : t({
              en: "Home students in England can borrow the full tuition fee plus a means-tested maintenance loan — see the Fees page. Most halls contracts run 40–51 weeks.",
              zh: "英格兰本地生可以贷全额学费，另有按家庭收入发放的生活费贷款，详见“学费”页面。大部分宿舍合同为 40–51 周。",
            })}
      </Callout>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-t border-white/60 pt-2">
      <dt className="text-slate-600">{label}</dt>
      <dd className="font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
