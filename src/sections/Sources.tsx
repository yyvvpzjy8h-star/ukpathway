import { useLang } from "../i18n";
import { DATA_CHECKED, SOURCES } from "../data/facts";
import { UNIVERSITIES } from "../data/universities";
import { Callout, Card, ExtLink, SectionTitle } from "../components/ui";

export default function Sources() {
  const { t } = useLang();
  return (
    <div className="space-y-6">
      <SectionTitle
        title={t({ en: "Sources & disclaimer", zh: "数据来源与免责声明" })}
        subtitle={t({ en: `Data last checked: ${DATA_CHECKED.en}.`, zh: `数据最近核对时间：${DATA_CHECKED.zh}。` })}
      />
      <Callout tone="amber">
        {t({
          en: "UKPathway is an independent guide and is not affiliated with any university, UCAS or the UK government. Figures can change — always confirm on the official pages linked below before making decisions. Figures marked “Unverified” or “Check official site” could not be confirmed from an official source.",
          zh: "UKPathway 是独立的参考网站，与任何大学、UCAS 或英国政府无关。数据可能变化，做决定前请务必在下方官方链接中确认。标为“待核实”或“请查官网”的数据未能从官方来源确认。",
        })}
      </Callout>
      <Card>
        <h3 className="font-semibold text-slate-900">{t({ en: "Official & reference sources", zh: "官方及参考来源" })}</h3>
        <ul className="mt-2 grid sm:grid-cols-2">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <ExtLink href={s.url}>{s.label}</ExtLink>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="font-semibold text-slate-900">{t({ en: "University fee pages", zh: "各校学费官方页面" })}</h3>
        <ul className="mt-2 grid sm:grid-cols-2">
          {UNIVERSITIES.map((u) => (
            <li key={u.id}>
              <ExtLink href={u.feesUrl}>{u.name}</ExtLink>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
