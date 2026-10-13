import { useLang } from "../i18n";
import { DATA_CHECKED, HERO_PHOTO, SOURCES } from "../data/facts";
import { UNIVERSITIES, photoPage } from "../data/universities";
import { Callout, Card, ExtLink, SectionTitle } from "../components/ui";

export default function Sources() {
  const { t } = useLang();
  const photos = [{ name: t({ en: "Home page", zh: "首页" }), ...HERO_PHOTO, license: undefined as string | undefined }, ...UNIVERSITIES.map((u) => ({ name: u.name, ...u.photo }))];
  return (
    <div className="space-y-6">
      <SectionTitle
        title={t({ en: "Sources, credits & disclaimer", zh: "来源、署名与免责声明" })}
        subtitle={t({ en: `Data last checked: ${DATA_CHECKED.en}.`, zh: `数据最近核对时间：${DATA_CHECKED.zh}。` })}
      />
      <Callout tone="amber">
        {t({
          en: "UKPathway is an independent guide, not affiliated with any university, UCAS or the UK government. Recommendations are estimates to help you shortlist, not predictions of offers. Figures change — always confirm on official pages. Figures marked “Unverified” or “Check official site” could not be confirmed from an official source.",
          zh: "UKPathway 是独立的参考网站，与任何大学、UCAS 或英国政府无关。推荐结果只是帮助你初步筛选的估算，不代表录取预测。数据可能变化，请以官方页面为准。标为“待核实”或“请查官网”的数据未能从官方来源确认。",
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
        <h3 className="font-semibold text-slate-900">{t({ en: "University websites", zh: "各大学官网" })}</h3>
        <ul className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3">
          {UNIVERSITIES.map((u) => (
            <li key={u.id}>
              <ExtLink href={u.feesUrl ?? u.website}>{u.name}</ExtLink>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="font-semibold text-slate-900">{t({ en: "Photo credits", zh: "照片署名" })}</h3>
        <p className="mt-1 text-sm text-slate-600">
          {t({
            en: "All photos come from Wikimedia Commons under free licences (Creative Commons, public domain or as stated on each file page). Tap a credit to see the author and full licence.",
            zh: "所有照片均来自维基共享资源（Wikimedia Commons），采用自由授权（知识共享、公有领域或文件页面注明的授权）。点击署名可查看作者和完整授权信息。",
          })}
        </p>
        <ul className="mt-3 grid gap-x-6 text-sm sm:grid-cols-2">
          {photos.map((p) => (
            <li key={p.file}>
              <a href={photoPage(p.file)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center text-blue-700 hover:underline">
                {p.name} — {p.author ?? "Wikimedia Commons"}
                {p.license ? ` (${p.license})` : ""}
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
