import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { minimumNameLength, minimumPasswordLength, validateAuthForm } from "../validation.js";
import { submitAuthForm } from "../submission.js";
import AuthField from "./AuthField.jsx";

export default function AuthForm({ mode }) {
  const { t } = useLanguage();
  const isRegister = mode === "register";
  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(null);
  const errors = validateAuthForm(mode, values);

  function fieldProps(name) {
    return {
      name,
      label: t(`auth.field.${name}`),
      value: values[name],
      error: (touched[name] || submitted) && errors[name] ? t(errors[name], {
        nameLength: minimumNameLength, passwordLength: minimumPasswordLength,
      }) : null,
      onChange: (event) => {
        const value = event.target.value;
        setValues((current) => ({ ...current, [name]: value }));
        setNotice(null);
      },
      onBlur: () => setTouched((current) => ({ ...current, [name]: true })),
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setNotice(null);
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      event.currentTarget.elements.namedItem(firstInvalid)?.focus();
      return;
    }
    const result = submitAuthForm(mode, {
      ...(isRegister ? { name: values.name.trim() } : {}),
      email: values.email.trim(),
      password: values.password,
    });
    setNotice(result.messageKey);
  }

  return (
    <form className="auth-form" aria-labelledby="auth-title" noValidate onSubmit={handleSubmit}>
      {isRegister ? <AuthField {...fieldProps("name")} autoComplete="name" /> : null}
      <AuthField {...fieldProps("email")} type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} />
      <AuthField
        {...fieldProps("password")}
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
        hint={isRegister ? t("auth.password.hint", { passwordLength: minimumPasswordLength }) : null}
      />
      {isRegister ? <AuthField {...fieldProps("confirmPassword")} type="password" autoComplete="new-password" /> : null}
      <button type="submit" className="auth-submit">{t(`auth.${mode}.action`)}</button>
      {notice ? <p className="auth-notice" role="status">{t(notice)}</p> : null}
    </form>
  );
}
