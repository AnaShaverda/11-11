import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function WeddingDayPoster({ variant, title, date, time = "17:00", location }) {
  const { t } = useLanguage();
  const day = parseInt(date, 10) || 16;
  const steps = [0, 1, 2, 3].map((index) => t(`cards.wedding.step.${index}`));
  return <div className={`wedding-day-poster ${variant}`}>
    <span className="day-poster-opening">{t("cards.wedding.saveDate")}</span>
    <strong className="day-poster-names">{title}</strong>
    {["date-and-dinner", "colorful-company"].includes(variant) ? <div className="day-calendar" aria-hidden="true">{[day - 1, day, day + 1].map((n, i) => <span key={n} className={i === 1 ? "selected-day" : ""}>{n < 1 ? "·" : n > 31 ? "·" : n}</span>)}</div> : <ol className="day-poster-timeline">{steps.map((step, i) => <li key={step}><span>{`0${i + 1}`}</span>{step}</li>)}</ol>}
    <span className="day-poster-details">{date} · {time}<br />{location}</span>
  </div>;
}
