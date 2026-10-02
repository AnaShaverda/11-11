import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function GenderRevealPoster({ title, line, date, time, location, variant }) {
  const { language } = useLanguage();
  const ka = language === "ka";
  return <div lang={language} className={`reveal-poster-copy reveal-poster-${variant}`}>
    <span className="reveal-heading">{variant === "bear-hug" ? (ka ? "პატარა ჩახუტება" : "A little bear hug") : variant === "up-in-the-air" ? (ka ? "პატარა სიურპრიზი" : "A little surprise") : variant === "special-delivery" ? (ka ? "პატარა გზავნილი" : "Special delivery!") : variant === "little-wonder" ? (ka ? "პატარა სასწაული" : "Oh, baby!") : ka ? "ვარდისფერი თუ ცისფერი?" : variant === "pink-or-blue" ? "Pink or Blue?" : "He or She?"}</span>
    <span className="reveal-message">{line}</span>
    <span className="reveal-invited">{ka ? "შემოგვიერთდით სქესის გაგების წვეულებაზე" : "Join us for a gender reveal"}</span>
    <strong className="reveal-name">{title}</strong>
    <span className="reveal-details">{date}{time && <> · {time}</>}<br />{location}</span>
    <span className="reveal-closing">{ka ? "პატარა სიურპრიზი, დიდი სიყვარული." : "A little surprise. A lot of love."}</span>
  </div>;
}
