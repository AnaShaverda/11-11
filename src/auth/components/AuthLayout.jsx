import { Link } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "../../components/ui/Icon.jsx";

export default function AuthLayout({ mode, children }) {
  const { t } = useLanguage();
  const isRegister = mode === "register";
  return (
    <section className="auth-page" aria-labelledby="auth-title">
      <div className="auth-panel">
        <div className="auth-signature" aria-hidden="true">
          <span>11:11</span><Icon name="sparkle" size={22} />
        </div>
        <div className="auth-heading">
          <h1 id="auth-title">{t(`auth.${mode}.title`)}</h1>
          <p>{t(`auth.${mode}.description`)}</p>
        </div>
        {children}
        <p className="auth-alternative">
          <span>{t(isRegister ? "auth.register.alternative" : "auth.login.alternative")}</span>{" "}
          <Link to={isRegister ? "/login" : "/register"}>
            {t(isRegister ? "auth.login.action" : "auth.register.action")}
          </Link>
        </p>
      </div>
    </section>
  );
}
