import { birthdaySurprise, surpriseOccasions, surpriseOptionalModuleIds } from "./surprises.js";

export function readPreviewConfig(params, { fullExample = false } = {}) {
  const occasion = surpriseOccasions.find((item) => item.id === params.get("occasion")) ?? surpriseOccasions[0];
  const themeId = occasion.themeIds.includes(params.get("theme")) ? params.get("theme") : occasion.themeIds[0];
  const availableModules = surpriseOptionalModuleIds.filter((id) => id !== "cake" || occasion.id === "birthday");
  const defaults = occasion.id === "birthday" ? ["cake", "memories", "wishes"] : ["love-notes", "memories", "letter"];
  const requested = params.has("modules") ? params.get("modules").split(",") : fullExample && occasion.id === "birthday" ? birthdaySurprise.enabledModules : defaults;
  return { occasion, themeId, availableModules, selectedModules: availableModules.filter((id) => requested.includes(id)) };
}

export function previewParams(occasionId, themeId, modules) {
  return new URLSearchParams({ occasion: occasionId, theme: themeId, modules: modules.join(",") }).toString();
}

export function previewPersonalization(value = {}) {
  return Object.fromEntries(["recipientName", "creatorName", "message"].map((key) => [key, typeof value?.[key] === "string" ? value[key].slice(0, key === "message" ? 600 : 60) : ""]));
}
