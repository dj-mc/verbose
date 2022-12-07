import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";

import { contact_validation_schema } from "verbose-common";

import socket from "../socket-io.js";
import TextInput from "./TextInput";

function AddContact({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [error, set_error] = useState("");

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        {/* Modal sits atop on overlay background */}
        <ModalOverlay />

        {/* Content of modal */}
        <ModalContent>
          <ModalHeader>Add New Contact</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ username: "" }}
            validationSchema={contact_validation_schema}
            onSubmit={(values, actions) => {
              console.log("AddContact onSubmit");
              // Trigger add_contact event
              socket.emit(
                "add_contact",
                values.username,
                ({ done, error_message }) => {
                  if (done) {
                    onClose();
                    return;
                  } else {
                    set_error(error_message);
                  }
                }
              );
              actions.resetForm();
            }}
          >
            <Form>
              <ModalBody>
                <TextInput
                  label="Contact's username"
                  name="username"
                  autoComplete="off"
                />
              </ModalBody>

              <ModalFooter>
                <p className="error-message" style={{ marginRight: "20px" }}>
                  {error}
                </p>
                <Button type="submit" colorScheme="cyan">
                  Add
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddContact;
