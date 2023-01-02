import { FormikHelpers } from "formik";

function submit_auth_handler(
  values: { username: string; password: string },
  actions: FormikHelpers<{
    username: string;
    password: string;
  }>,
  endpoint: string
) {
  actions.resetForm(); // Clear input

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
        return false; // Bad server response
      } else {
        return response.json(); // Return then-able promise
      }
    });
}

export default submit_auth_handler;
