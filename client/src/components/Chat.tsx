import { TabPanel, TabPanels, VStack } from "@chakra-ui/react";
import { useContext } from "react";

import ContactsContext, { IContact } from "./ContactsContext";

function Chat() {
  const { contacts } = useContext(ContactsContext);
  return (
    <>
      <VStack>
        <TabPanels>
          {contacts.length > 0 ? (
            contacts.map((contact: IContact) => (
              <TabPanel>Chatting with {contact.username}</TabPanel>
            ))
          ) : (
            <p>Invite someone to chat!</p>
          )}
        </TabPanels>
      </VStack>
    </>
  );
}

export default Chat;
