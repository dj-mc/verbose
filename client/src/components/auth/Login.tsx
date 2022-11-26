import { Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { auth_schema } from "verbose-common";
import TextInput from "../TextInput";

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={auth_schema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          fetch("http://localhost:4242/auth/login", {
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
        }}
      >
        <VStack
          as={Form}
          w={[300, 400, 500]}
          h="100vh"
          justify="center"
          m="auto"
        >
          <h1 className="h1-title">Login</h1>

          {/* Handle username */}
          <TextInput name="username" label="Username" />
          {/* Handle password */}
          <TextInput name="password" label="Password" type="password" />

          <hr />
          <ButtonGroup
            className="button-group"
            w="inherit"
            justifyContent={"space-between"}
          >
            <Button type="submit" colorScheme="cyan">
              Login
            </Button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "inherit",
              }}
            >
              <p>— or —</p>
            </div>

            <Button onClick={() => navigate("/register")}>Create</Button>
          </ButtonGroup>
          <hr />
        </VStack>
      </Formik>
    </>
  );
}

export default Login;
