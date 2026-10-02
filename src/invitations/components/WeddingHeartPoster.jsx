import { useLanguage } from "../../localization/LanguageContext.jsx";
import WeddingInkPoster from "./WeddingInkPoster.jsx";

export default function WeddingHeartPoster(props) {
  const { language } = useLanguage();
  const day = parseInt(props.date, 10) || 23;
  const neighbor = (n) => n < 1 || n > 31 ? "·" : n;
  return <>
    <div className="heart-calendar-grid" aria-hidden="true">
      <span className="heart-calendar-previous">{neighbor(day - 1)}</span>
      <span className="heart-calendar-next">{neighbor(day + 7)}</span>
    </div>
    <span className="heart-calendar-day" aria-label={`${language === "ka" ? "ქორწილის დღე" : "Wedding day"}: ${day}`}><span>{day}</span></span>
    <WeddingInkPoster {...props} />
  </>;
}
