import type { L } from "../i18n";

// Last checked against the sources listed in SOURCES below.
export const DATA_CHECKED: L = { en: "October 2026", zh: "2026 年 10 月" };

export const HOME_FEE = {
  england2627: 9790,
  england2728: 10050,
  scotlandRuk2627: 9535,
};

export const STUDENT_FINANCE = {
  maintenanceMaxOutsideLondon: 10830,
  maintenanceMaxLondon: 14135,
  plan5Threshold: 25000,
  plan5Rate: 9,
  plan5WriteOffYears: 40,
};

export const VISA = {
  applicationFee: 558,
  ihsPerYear: 776,
  fundsLondonPerMonth: 1529,
  fundsOutsidePerMonth: 1171,
  fundsMonths: 9,
};

export type KeyDate = { date: string; label: L; note?: L; past?: boolean };

// 2027 entry cycle. ISO dates are UK local time.
export const KEY_DATES: KeyDate[] = [
  { date: "2026-09-01", label: { en: "UCAS applications can be submitted", zh: "UCAS 开始接受提交申请" } },
  {
    date: "2026-10-12",
    label: { en: "TMUA sitting 1 (12–16 Oct)", zh: "TMUA 第一场考试（10 月 12–16 日）" },
    note: { en: "ESAT also sits in October — check UAT-UK for booking deadlines", zh: "ESAT 也在 10 月考，报名截止日期请看 UAT-UK 官网" },
  },
  {
    date: "2026-10-15T18:00",
    label: { en: "Deadline: Oxford, Cambridge, most Medicine / Dentistry / Vet", zh: "截止：牛津、剑桥及大部分医学/牙医/兽医专业" },
    note: { en: "18:00 UK time", zh: "英国时间 18:00" },
  },
  { date: "2026-12-01", label: { en: "Oxbridge interviews (most in December)", zh: "牛剑面试（大部分在 12 月）" } },
  { date: "2027-01-04", label: { en: "TMUA sitting 2 (4–8 Jan)", zh: "TMUA 第二场考试（1 月 4–8 日）" } },
  {
    date: "2027-01-13T18:00",
    label: { en: "Main UCAS deadline (equal consideration) for most courses", zh: "大部分专业的 UCAS 主截止日（保证同等考虑）" },
    note: { en: "18:00 UK time", zh: "英国时间 18:00" },
  },
  { date: "2027-02-25", label: { en: "UCAS Extra opens", zh: "UCAS Extra 开放" } },
  { date: "2027-06-30", label: { en: "Applications after this date go into Clearing", zh: "此日期之后提交的申请直接进入 Clearing" } },
  { date: "2027-07-02", label: { en: "Clearing opens", zh: "Clearing（补录）开放" } },
  { date: "2027-08-12", label: { en: "A-level results day (mid-August — confirm exact date)", zh: "A-Level 放榜（8 月中旬，具体日期以官方为准）" } },
];

export type Source = { label: string; url: string };

export const SOURCES: Source[] = [
  { label: "UCAS – filling in your application", url: "https://www.ucas.com/applying/applying-to-university/filling-in-your-ucas-application" },
  { label: "UCAS – personal statement (2026 entry onwards)", url: "https://www.ucas.com/applying/applying-to-university/writing-your-personal-statement/how-to-write-your-personal-statement-for-2026-entry-onwards" },
  { label: "UCAS – 2027 entry deadline (Oxford, Cambridge, Medicine)", url: "https://www.ucas.com/events/2027-entry-deadline-for-the-universities-of-oxford-and-cambridge-and-most-courses-in-medicine-475536" },
  { label: "UAT-UK – ESAT / TMUA / TARA", url: "https://esat-tmua.ac.uk/" },
  { label: "Oxford – admissions tests", url: "https://www.ox.ac.uk/admissions/undergraduate/applying-to-oxford/guide/admissions-tests" },
  { label: "GOV.UK – Student visa", url: "https://www.gov.uk/student-visa" },
  { label: "GOV.UK – Graduate visa", url: "https://www.gov.uk/graduate-visa" },
  { label: "GOV.UK – Student finance", url: "https://www.gov.uk/student-finance" },
  { label: "GOV.UK – Repaying your student loan", url: "https://www.gov.uk/repaying-your-student-loan" },
  { label: "UKCISA – fees and fee status", url: "https://www.ukcisa.org.uk/" },
  { label: "SAAS – Scottish students' tuition", url: "https://www.saas.gov.uk/" },
  { label: "Discover Uni – course & graduate data", url: "https://discoveruni.gov.uk/" },
  { label: "QS World University Rankings", url: "https://www.topuniversities.com/world-university-rankings" },
  { label: "Universities UK – international student levy", url: "https://www.universitiesuk.ac.uk/topics/international/understanding-uks-new-levy-universities" },
];

export const HERO_PHOTO = {
  file: "Imperial_College_London_graduation_gowns.jpg",
  author: "Imperial College London / Stewart Oak",
};
