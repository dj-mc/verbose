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

import { contact_validation_schema } from "verbose-common";
import TextInput from "./TextInput";

function AddContact({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
              onClose(); // Close modal after validation
              actions.resetForm();
            }}
          >
            <Form>
              <ModalBody>
                <TextInput label="Contact's username" name="username" />
              </ModalBody>

              <ModalFooter>
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
