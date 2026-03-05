import { landingPageData, type LandingPageData } from "../data/landing";
import { mergeWithShape } from "./jsonShape";

export type LandingEditableContent = LandingPageData;

const STORAGE_KEY = "landing-admin";
const DRAFT_KEY = "landing-admin-draft";

function parseStoredLandingContent(raw: string): LandingEditableContent | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return mergeWithShape(landingPageData, parsed);
  } catch {
    return null;
  }
}

export function loadLandingOverrides(): LandingEditableContent | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  return parseStoredLandingContent(raw);
}

export function saveLandingOverrides(content: LandingEditableContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function clearLandingOverrides() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function loadLandingDraft(): LandingEditableContent | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;

  return parseStoredLandingContent(raw);
}

export function saveLandingDraft(content: LandingEditableContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(content));
}

export function clearLandingDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}

export function mergeLandingWithOverrides(base: LandingPageData): LandingPageData {
  const overrides = loadLandingOverrides();
  if (!overrides) return base;
  return mergeWithShape(base, overrides);
}

export function getLandingDefaults(): LandingEditableContent {
  return landingPageData;
}
