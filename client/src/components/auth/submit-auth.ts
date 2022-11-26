import { FormikHelpers } from "formik";

function submit_auth(
  values: { username: string; password: string },
  actions: FormikHelpers<{
    username: string;
    password: string;
  }>,
  endpoint: string
) {
  actions.resetForm();
  fetch(`http://localhost:4242/auth/${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  })
    .catch((error) => {
      console.error(error);
      return;
    })
    .then((response) => {
      if (!response || !response.ok || response.status >= 400) {
        return;
      }
      return response.json();
    })
    .then((data) => {
      if (!data) return;
      console.log(data);
    });
}

export { submit_auth };
