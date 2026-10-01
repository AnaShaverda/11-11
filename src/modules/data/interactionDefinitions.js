// Module behavior defaults contain no event, theme, guest, or sharing data.
export const interactionDefinitions = {
  "photo-upload": { symbol: "↗", createConfig: () => ({ maxFiles: 10 }) },
  "guest-book": { symbol: "♡", createConfig: () => ({}) },
  quiz: { symbol: "✳", createConfig: (t) => ({ questions: [
    { id: "q1", question: t("interactions.quiz.sampleQuestion"), options: [t("interactions.quiz.option1"), t("interactions.quiz.option2"), t("interactions.quiz.option3")], correctAnswer: 0 },
  ] }) },
};

export const accessMethods = ["direct-link", "guest-link", "qr-code"];
export const defaultAccess = () => ({ methods: ["direct-link"], delivery: { mode: "now", date: "", time: "", timeZone: "Asia/Tbilisi" } });

export function createInteraction(type, t, id = crypto.randomUUID()) {
  const definition = interactionDefinitions[type];
  if (!Object.hasOwn(interactionDefinitions, type)) throw new Error(`Unknown interaction type: ${type}`);
  return { id, type, enabled: true, title: t(`interactions.${type}.defaultTitle`), description: t(`interactions.${type}.defaultDescription`), config: definition.createConfig(t) };
}
