import { GROUPABLE_PUSH_TIERS, groupablePushCatalog } from "./groupableCatalog.js";
import { getNoticeScenario } from "./scenarios.js";
import { SINGLE_PUSH_TIERS, singlePushCatalog } from "./singleCatalog.js";

export { getNoticeScenario };

export const pushPersonas = [
  { id: "single", label: "Single", enabled: true },
  { id: "groupable", label: "Groupable", enabled: true },
  { id: "global", label: "Global", enabled: false }
];

export const pushTiersByPersona = {
  single: SINGLE_PUSH_TIERS,
  groupable: GROUPABLE_PUSH_TIERS,
  global: []
};

export const pushTiers = SINGLE_PUSH_TIERS;

export const pushNotificationCatalog = [...singlePushCatalog, ...groupablePushCatalog];

export function catalogByTier(persona = "single") {
  const tiers = pushTiersByPersona[persona] ?? [];
  return tiers.map((tier) => ({
    tier,
    items: pushNotificationCatalog.filter((n) => n.persona === persona && n.tier === tier)
  }));
}
