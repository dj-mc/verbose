import { Button, HStack, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";

import { chat_input_validation_schema } from "verbose-common";

import socket from "../socket-io.js";
import MessagesContext, { IMessage } from "./MessagesContext.js";

function ChatForm({ contact_id }: { contact_id: string }) {
  const { set_messages } = useContext(MessagesContext);
  return (
    <>
      <Formik
        initialValues={{ message: "" }}
        validationSchema={chat_input_validation_schema}
        onSubmit={(values, actions) => {
          // No whitespace messages
          if (values.message.trim() !== "") {
            const message = {
              to: contact_id,
              from: null,
              // Replace extraneous whitespace between words
              // with a single space.
              content: values.message.trim().replace(/\s+/g, " "),
            };
            socket.emit("direct_message", message);
            set_messages((previous_messages: IMessage[]) => [
              message,
              ...previous_messages,
            ]);
            console.log(JSON.stringify(message));
          }
          actions.resetForm();
        }}
      >
        <HStack as={Form} w="100%" pb="16px" px="16px">
          <Input as={Field} name="message" />
          <Button type="submit" colorScheme="cyan" marginTop="200px">
            Send
          </Button>
        </HStack>
      </Formik>
    </>
  );
}

export default ChatForm;
