import { Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import TextInput from "../TextInput";

export const auth_schema = Yup.object({
  // Validate username input
  username: Yup.string()
    .required("Required")
    .min(3, "Need at least 3 characters")
    .max(16, "Need at most 16 characters"),
  // Validate password input
  password: Yup.string()
    .required("Required")
    .min(9, "Need at least 9 characters")
    .max(32, "Need at most 32 characters"),
});

function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={auth_schema}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.resetForm();
        }}
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
        </VStack>
      </Formik>
    </>
  );
}

export default SignUp;
