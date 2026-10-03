export const MAX_DAY_PLAN_ITEMS = 12;
export const MAX_DAY_PLAN_TITLE = 100;
export const MAX_DAY_PLAN_DETAILS = 240;

export function isValidDayPlanItem(item) {
  return Boolean(item && typeof item.time === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(item.time)
    && typeof item.title === "string" && item.title.trim() && item.title.length <= MAX_DAY_PLAN_TITLE
    && (item.details === undefined || (typeof item.details === "string" && item.details.length <= MAX_DAY_PLAN_DETAILS)));
}

// Preserve the planner's order, including celebrations that continue after midnight.
export function normalizeGuestDayPlan(value) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, MAX_DAY_PLAN_ITEMS).filter(isValidDayPlanItem).map(item => ({
    time: item.time, title: item.title.trim(), details: item.details?.trim() ?? "",
  }));
}

export function getDayPlanErrors(items) {
  return items.flatMap((item, index) => {
    const hasContent = [item?.time, item?.title, item?.details].some(value => typeof value === "string" && value.trim());
    return hasContent && !isValidDayPlanItem(item) ? [index] : [];
  });
}
