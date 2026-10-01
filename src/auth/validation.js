export const minimumNameLength = 2;
export const minimumPasswordLength = 8;

export function validateAuthForm(mode, values) {
  const errors = {};
  if (mode === "register") {
    const name = values.name.trim();
    if (!name) errors.name = "auth.validation.required";
    else if (Array.from(name).length < minimumNameLength) errors.name = "auth.validation.nameShort";
  }

  const email = values.email.trim();
  if (!email) errors.email = "auth.validation.required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "auth.validation.email";

  if (!values.password.trim()) errors.password = "auth.validation.required";
  else if (mode === "register" && Array.from(values.password).length < minimumPasswordLength) {
    errors.password = "auth.validation.passwordShort";
  }

  if (mode === "register") {
    if (!values.confirmPassword) errors.confirmPassword = "auth.validation.required";
    else if (values.confirmPassword !== values.password) errors.confirmPassword = "auth.validation.passwordMatch";
  }
  return errors;
}
