import { VStack } from "@chakra-ui/react";
import { useContext } from "react";

import ChatRoom from "./ChatRoom";
import ChatForm from "./ChatForm";
import ContactsContext from "./ContactsContext";
import MessagesContext from "./MessagesContext";

function Chat({ contact_id }: { contact_id: string }) {
  const { contacts } = useContext(ContactsContext);
  const { messages } = useContext(MessagesContext);

  return (
    <>
      <VStack h="100%" justify="end">
        <ChatRoom contacts={contacts} messages={messages} />
        <ChatForm contact_id={contact_id} />
      </VStack>
    </>
  );
}

export default Chat;
