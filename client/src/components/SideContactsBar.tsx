import {
  Circle,
  Flex,
  HStack,
  Spacer,
  Tab,
  TabList,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";

import ContactsContext, { IContact } from "./ContactsContext";

function SideContactsBar() {
  const { contacts } = useContext(ContactsContext);
  return (
    <>
      <VStack pt="16px" borderLeft="1px solid grey" h="100%">
        <HStack justify="space-evenly" w="100%">
          <p>Contacts</p>
        </HStack>
        <VStack as={TabList} border="none" borderTop="1px solid grey" w="80%">
          {contacts.length > 0 ? (
            contacts.map((contact: IContact) => (
              <Flex as={Tab} direction="row" w="100%">
                <Circle
                  size="10px"
                  bg={contact.online ? "green.500" : "red.500"}
                />
                <Spacer />
                <p>{contact.username}</p>
              </Flex>
            ))
          ) : (
            <p style={{ marginTop: "25px" }}>None</p>
          )}
        </VStack>
      </VStack>
    </>
  );
}

export default SideContactsBar;
