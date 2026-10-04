import AuthForm from "../components/AuthForm.jsx";
import AuthLayout from "../components/AuthLayout.jsx";

export default function LoginPage() {
  return <AuthLayout mode="login"><AuthForm mode="login" /></AuthLayout>;
}
