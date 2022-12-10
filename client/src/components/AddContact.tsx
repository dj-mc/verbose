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
import { useContext, useState } from "react";

import { contact_validation_schema } from "verbose-common";

import socket from "../socket-io.js";
import ContactsContext, { IContact } from "./ContactsContext.js";
import TextInput from "./TextInput";

function AddContact({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [error, set_error] = useState("");
  const { set_contacts } = useContext(ContactsContext);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay /> {/* Modal content sits on overlay */}
        <ModalContent>
          <ModalHeader>Add New Contact</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ username: "" }}
            validationSchema={contact_validation_schema}
            onSubmit={(values, actions) => {
              // Trigger add_contact event
              socket.emit(
                "add_contact",
                values.username,
                ({
                  done,
                  error_message,
                  new_contact,
                }: {
                  done: boolean;
                  error_message: string;
                  new_contact: IContact;
                }) => {
                  if (done) {
                    // Update UI with user's new contacts list
                    set_contacts((contacts: IContact[]) => {
                      console.log("set_contacts:", [new_contact, ...contacts]);
                      return [new_contact, ...contacts];
                    });
                    onClose();
                    return;
                  } else {
                    set_error(error_message);
                    // Clear error after 5 seconds
                    setTimeout(() => {
                      set_error("");
                    }, 5000);
                  }
                }
              );
              actions.resetForm();
            }}
          >
            <Form>
              <ModalBody>
                <TextInput name="username" label="Contact's username" />
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
