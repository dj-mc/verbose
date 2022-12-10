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
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";

import AddContact from "./AddContact";
import ContactsContext, { IContact } from "./ContactsContext";

function SideContactsBar() {
  const { contacts } = useContext(ContactsContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [smaller_than_650px] = useMediaQuery("(max-width: 650px)");

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
                fontSize: smaller_than_650px ? "smaller" : "medium",
                display: "inline-block",
                textDecoration: smaller_than_650px ? "underline" : "none",
                marginRight: smaller_than_650px ? "0px" : "10px",
                lineHeight: 1,
              }}
            >
              {/* Contacts title */}
              {smaller_than_650px ? (
                <a style={{ cursor: "pointer" }} onClick={onOpen}>
                  Contacts
                </a>
              ) : (
                "Contacts"
              )}
            </p>

            {/* Add new contact button, (+) opens modal */}
            {smaller_than_650px ? null : (
              <Button className="add-contact" onClick={onOpen} size="xs">
                <AddIcon />
              </Button>
            )}
          </div>
        </HStack>

        {/* Contact online/offline list */}
        <VStack as={TabList} border="none" borderTop="1px solid grey" w="80%">
          {contacts.length > 0 ? (
            // Map each contact from context to its own Flex container
            contacts.map((contact: IContact) => (
              <Flex as={Tab} key={contact.username} direction="row" w="100%">
                <Circle
                  size={smaller_than_650px ? "5px" : "10px"}
                  // Online (green) or offline (red)
                  bg={contact.online ? "green.500" : "red.500"}
                />

                <Spacer />
                <div className="truncate-text-parent">
                  <p
                    className="truncate-text"
                    style={{
                      fontSize: smaller_than_650px ? "smaller" : "medium",
                    }}
                  >
                    {contact.username}
                  </p>
                </div>
              </Flex>
            ))
          ) : (
            // Otherwise display "None"
            <p
              style={{
                marginTop: "25px",
              }}
            >
              None
            </p>
          )}
        </VStack>
      </VStack>
    </>
  );
}

export default SideContactsBar;
