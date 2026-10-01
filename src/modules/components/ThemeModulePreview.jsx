import { useLanguage } from "../../localization/LanguageContext.jsx";

const examples = {
  "friendship-diary": { prompt: "How did we meet?", response: "One rainy evening, one long conversation, and a friendship that never stopped growing." },
  "guest-messages": { prompt: "A message from your people", response: "You make every room feel brighter. Here’s to all the moments still ahead." },
  quiz: { prompt: "Who knows the host best?", response: "A playful round of questions for the people who know every story." },
  games: { prompt: "Let’s play together", response: "Little games turn the quiet moments into shared memories." },
  "guest-book": { prompt: "A note for the happy couple", response: "May your story always make space for laughter, tenderness, and adventure." },
  memories: { prompt: "A favorite memory", response: "The best stories begin with the people gathered around us." },
  rsvp: { prompt: "A warm reply", response: "A simple way for your guests to say they’ll be there." },
};

export default function ThemeModulePreview({ moduleId, event }) {
  const { t } = useLanguage();
  const example = examples[moduleId] ?? examples["guest-messages"];
  return (
    <div className="theme-module-preview">
      <div className="theme-module-top"><span>{t("modulePreview.label")}</span></div>
      <h3>{t(`modules.${moduleId}.title`)}</h3>
      <p>{t(`modules.${moduleId}.description`)}</p>
      <div className="theme-module-question"><small>{example.prompt}</small><strong>{example.response}</strong><span>{t("modulePreview.guest", { name: event.hostName })}</span></div>
    </div>
  );
}
