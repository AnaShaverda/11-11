// Frontend preview boundary. Replace this function with authService.login/register
// when a backend exists. Never log, persist, or send credentials in this preview.
export function submitAuthForm(_mode, _credentials) {
  return { messageKey: "auth.submission.preview" };
}
