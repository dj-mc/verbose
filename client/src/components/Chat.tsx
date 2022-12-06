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
            // Map each contact from context to its own TabPanel
            contacts.map((contact: IContact) => (
              <TabPanel key={contact.username}>
                Chatting with {contact.username}
              </TabPanel>
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
