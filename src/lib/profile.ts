import type { CourseId } from "../data/courses";
import type { GcseQualId, QualId, SubjectId } from "../data/subjects";

export type Stage = "gcse" | "sixth";
export type FeeType = "home" | "scottish" | "intl";
export type Region = "london" | "england" | "scotland" | "wales_ni";
export type Setting = "any" | "campus" | "city" | "collegiate";

export type SubjectRow = { subject: SubjectId; board: string; grade: string };

export type Profile = {
  name: string;
  stage: Stage;
  gcseQual: GcseQualId;
  gcses: SubjectRow[];
  qual: QualId;
  subjects: SubjectRow[];
  ibTotal: number;
  interests: CourseId[];
  careers: string[];
  feeType: FeeType;
  regions: Region[];
  setting: Setting;
  budget: number; // max total cost per year in £, 0 = no limit
};

export const EMPTY_PROFILE: Profile = {
  name: "",
  stage: "sixth",
  gcseQual: "gcse",
  gcses: [],
  qual: "alevel",
  subjects: [],
  ibTotal: 0,
  interests: [],
  careers: [],
  feeType: "home",
  regions: [],
  setting: "any",
  budget: 0,
};

const KEY = "ukpathway-profile-v1";

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY_PROFILE, ...JSON.parse(raw) };
  } catch {
    /* storage unavailable or corrupt */
  }
  return EMPTY_PROFILE;
}

export function saveProfile(p: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable */
  }
}

export function clearProfile() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}
