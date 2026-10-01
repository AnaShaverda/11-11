import { useId, useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "../../components/ui/Icon.jsx";

export default function AuthField({ name, label, type = "text", error, hint, ...inputProps }) {
  const id = useId();
  const { t } = useLanguage();
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const descriptions = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className={`auth-input-wrap${isPassword ? " has-reveal" : ""}`}>
        <input
          {...inputProps}
          id={id}
          name={name}
          type={isPassword && revealed ? "text" : type}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={descriptions || undefined}
        />
        {isPassword ? (
          <button
            type="button"
            className="auth-reveal"
            aria-label={t(revealed ? "auth.password.hide" : "auth.password.show", { field: label })}
            aria-pressed={revealed}
            aria-controls={id}
            onClick={() => setRevealed((value) => !value)}
          >
            <Icon name={revealed ? "eye-off" : "eye"} size={20} />
          </button>
        ) : null}
      </div>
      {error ? <p className="auth-field-error" id={`${id}-error`} aria-live="polite">{error}</p> : null}
      {hint ? <p className="auth-field-hint" id={`${id}-hint`}>{hint}</p> : null}
    </div>
  );
}
