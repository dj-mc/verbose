import { FormikHelpers } from "formik";

function submit_auth(
  values: { username: string; password: string },
  actions: FormikHelpers<{
    username: string;
    password: string;
  }>,
  endpoint: string
) {
  actions.resetForm(); // Clear submitted form

  return fetch(`http://localhost:4242/auth/${endpoint}`, {
    // POST request to specified auth route endpoint (login/register)
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }), // Username/password
  })
    .catch((error) => {
      console.error(error);
      return;
    })
    .then((response) => {
      if (!response || !response.ok || response.status >= 400) {
        return; // Bad server response
      } else {
        return response.json(); // Return then-able promise
      }
    });
}

export { submit_auth };
