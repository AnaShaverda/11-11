import AuthForm from "../components/AuthForm.jsx";
import AuthLayout from "../components/AuthLayout.jsx";

export default function RegisterPage() {
  return <AuthLayout mode="register"><AuthForm mode="register" /></AuthLayout>;
}
