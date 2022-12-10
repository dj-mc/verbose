import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Circle,
  Flex,
  HStack,
  Spacer,
  Tab,
  TabList,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";

import AddContact from "./AddContact";
import ContactsContext, { IContact } from "./ContactsContext";

function SideContactsBar() {
  const { contacts } = useContext(ContactsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Add new contact modal */}
      <AddContact isOpen={isOpen} onClose={onClose} />

      {/* Contacts title and add new contact button */}
      <VStack pt="16px" borderLeft="1px solid grey" h="100%">
        <HStack justify="center" w="100%">
          <div
            style={{
              border: "1px solid grey",
              borderRadius: "5px",
              padding: "7px",
            }}
          >
            <p
              style={{
                display: "inline-block",
                textDecoration: "underline",
                marginRight: "10px",
                lineHeight: 1,
              }}
            >
              Contacts {/* Contacts title */}
            </p>

            {/* Add new contact button, (+) opens modal */}
            <Button className="add-contact" onClick={onOpen} size="xs">
              <AddIcon />
            </Button>
          </div>
        </HStack>

        {/* Contact online/offline list */}
        <VStack as={TabList} border="none" borderTop="1px solid grey" w="80%">
          {contacts.length > 0 ? (
            // Map each contact from context to its own Flex container
            contacts.map((contact: IContact) => (
              <Flex as={Tab} key={contact.username} direction="row" w="100%">
                <Circle
                  size="10px"
                  // Online (green) or offline (red)
                  bg={contact.online ? "green.500" : "red.500"}
                />

                <Spacer />

                <p>{contact.username}</p>
              </Flex>
            ))
          ) : (
            // Otherwise display "None"
            <p style={{ marginTop: "25px" }}>None</p>
          )}
        </VStack>
      </VStack>
    </>
  );
}

export default SideContactsBar;
