import { Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../UserContext";
import { auth_validation_schema } from "verbose-common";
import submit_auth_handler from "./submit-auth";
import TextInput from "../TextInput";

function SignUp() {
  const { set_user } = useContext(AuthContext);
  const [error, set_error] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={auth_validation_schema}
        // Pass input values from form to submission function
        // Actions contain FormikHelpers utilities
        onSubmit={(values, actions) =>
          submit_auth_handler(values, actions, "register").then((data) => {
            if (!data) return;
            set_user({ ...data });
            if (data.status) {
              set_error(data.status);
            } else if (data.logged_in === true) {
              navigate("/dashboard");
            }
          })
        }
      >
        <VStack
          as={Form}
          w={[300, 400, 500]}
          h="100vh"
          justify="center"
          m="auto"
        >
          <h1 className="h1-title">Sign Up</h1>

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
              Create
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

            <Button onClick={() => navigate("/")}>Login</Button>
          </ButtonGroup>
          <hr />

          <p className="error-message">{error}</p>
        </VStack>
      </Formik>
    </>
  );
}

export default SignUp;
