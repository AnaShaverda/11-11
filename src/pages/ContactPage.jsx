import { useLanguage } from "../localization/LanguageContext.jsx";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <section className="inner-page copy-page">
      <h1>{t("contact.title")}</h1>
      <p>{t("contact.description")}</p>
    </section>
  );
}
