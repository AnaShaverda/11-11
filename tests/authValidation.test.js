import test from "node:test";
import assert from "node:assert/strict";
import { validateAuthForm } from "../src/auth/validation.js";
import { submitAuthForm } from "../src/auth/submission.js";
import { captions } from "../src/localization/captions.js";

const registration = { name: "ნინო", email: " nino@example.com ", password: "test password", confirmPassword: "test password" };

test("login requires valid email and a password without registration length rules", () => {
  assert.deepEqual(validateAuthForm("login", { email: "", password: "" }), {
    email: "auth.validation.required", password: "auth.validation.required",
  });
  for (const email of ["nino", "nino@", "nino@example", "nino @example.com", "nino@@example.com"]) {
    assert.equal(validateAuthForm("login", { email, password: "x" }).email, "auth.validation.email");
  }
  assert.deepEqual(validateAuthForm("login", { email: "nino@example.com", password: "x" }), {});
});

test("registration validates name, password length and exact confirmation", () => {
  assert.deepEqual(validateAuthForm("register", registration), {});
  assert.equal(validateAuthForm("register", { ...registration, name: " ა " }).name, "auth.validation.nameShort");
  assert.equal(validateAuthForm("register", { ...registration, name: "  " }).name, "auth.validation.required");
  assert.equal(validateAuthForm("register", { ...registration, password: "1234567" }).password, "auth.validation.passwordShort");
  assert.equal(validateAuthForm("register", { ...registration, password: "        " }).password, "auth.validation.required");
  assert.equal(validateAuthForm("register", { ...registration, password: "12345678", confirmPassword: "12345678" }).password, undefined);
  assert.equal(validateAuthForm("register", { ...registration, confirmPassword: "" }).confirmPassword, "auth.validation.required");
  assert.equal(validateAuthForm("register", { ...registration, confirmPassword: "test password " }).confirmPassword, "auth.validation.passwordMatch");
});

test("preview submission returns only a localized notice, without credentials or session", () => {
  const result = submitAuthForm("register", registration);
  assert.deepEqual(result, { messageKey: "auth.submission.preview" });
  assert.deepEqual(registration, { name: "ნინო", email: " nino@example.com ", password: "test password", confirmPassword: "test password" });
});

test("auth captions have matching Georgian and English keys", () => {
  const keys = Object.keys(captions.en).filter((key) => key.startsWith("auth."));
  assert.deepEqual(keys.sort(), Object.keys(captions.ka).filter((key) => key.startsWith("auth.")).sort());
  for (const key of keys) {
    assert.ok(captions.en[key]);
    assert.ok(captions.ka[key]);
  }
});
