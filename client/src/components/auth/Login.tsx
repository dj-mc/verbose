import { Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { auth_schema } from "verbose-common";
import { submit_auth } from "./submit-auth";
import TextInput from "../TextInput";

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={auth_schema}
        onSubmit={(values, actions) => submit_auth(values, actions, "login")}
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
