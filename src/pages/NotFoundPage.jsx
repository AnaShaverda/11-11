import { useLanguage } from "../localization/LanguageContext.jsx";

export default function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <section className="inner-page copy-page">
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.description")}</p>
    </section>
  );
}
