import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

function Login() {
  return (
    <>
      <VStack as="form" w={[300, 400, 500]} h="100vh" justify="center" m="auto">
        <h1>Login</h1>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input name="username"></Input>
          <FormErrorMessage>Invalid username</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password"></Input>
          <FormErrorMessage>Invalid password</FormErrorMessage>
        </FormControl>

        <Divider />
        <ButtonGroup w="inherit" justifyContent={"space-between"}>
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

          <Button>Create Account</Button>
        </ButtonGroup>
        <Divider />
      </VStack>
    </>
  );
}

export default Login;
