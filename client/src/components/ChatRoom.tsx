import { TabPanel, TabPanels, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

import { IContact } from "./ContactsContext.js";
import { IMessage } from "./MessagesContext.js";

function ChatRoom({
  contacts,
  messages,
}: {
  contacts: IContact[];
  messages: IMessage[];
}) {
  const chatting_with = useRef(null);

  useEffect(() => {
    chatting_with.current?.scrollIntoView();
  });

  return (
    <>
      <TabPanels overflowY="scroll" maxW="100%" maxH="100vh">
        {
          // Map each contact from context to its own TabPanel
          contacts.map((contact: IContact) => (
            <VStack
              as={TabPanel}
              key={contact.username}
              flexDir="column-reverse"
              w="100%"
            >
              <p
                key={`${contact.username}:messages`}
                ref={chatting_with}
                style={{
                  marginTop: "16px",
                }}
              >
                Chatting with {contact.username}
              </p>

              {messages // All messages from all contacts
                .filter(
                  (message: IMessage) =>
                    // Filter for any messages associated with
                    // the currently mapped contact
                    message.to === contact.contact_id || // From user to contact
                    message.from === contact.contact_id // From contact to user
                )
                .map((message: IMessage, index: number) => (
                  <p
                    key={`${contact.username}:${index}`}
                    style={{
                      color:
                        message.to === contact.contact_id ? "white" : "black",
                      background:
                        message.to === contact.contact_id ? "black" : "white",
                      fontSize: "larger",
                      borderRadius: "10px",
                      padding: "5px",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      margin:
                        message.to === contact.contact_id
                          ? "16px auto 0 0"
                          : "16px 0 0 auto",
                      maxWidth: "50%",
                    }}
                  >
                    {message.content}
                  </p>
                ))}
            </VStack>
          ))
        }
      </TabPanels>
    </>
  );
}

export default ChatRoom;
