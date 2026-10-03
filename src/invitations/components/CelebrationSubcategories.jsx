import SelectField from "../../components/ui/SelectField.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function CelebrationSubcategories({ project, value, onChange }) {
  const { t } = useLanguage();
  const choices = [{ id: "all", captionKey: "invitations.all" }, ...project.subcategories];

  return (
    <div className="celebration-subcategories">
      <div className="celebration-subcategory-tabs" role="group" aria-label={t("catalog.subcategory")}>
        {choices.map((choice) => <button type="button" key={choice.id} className={`filter-button${value === choice.id ? " is-active" : ""}`} aria-pressed={value === choice.id} onClick={() => onChange(choice.id)}>{t(choice.captionKey)}</button>)}
      </div>
      <SelectField className="celebration-subcategory-select" id="catalog-occasion" label={t("catalog.subcategory")} hideLabel value={value} onChange={(event) => onChange(event.target.value)}>
        {choices.map((choice) => <option key={choice.id} value={choice.id}>{t(choice.captionKey)}</option>)}
      </SelectField>
    </div>
  );
}
