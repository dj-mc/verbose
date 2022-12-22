import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { IMessage } from "verbose-common";

import Chat from "../Chat";
import ContactsContext, { IContact } from "../ContactsContext";
import MessagesContext from "../MessagesContext";
import SideContactsBar from "../SideContactsBar";
import SideNavBar from "../SideNavBar";
import socket from "../../socket-io";
import { AuthContext } from "../UserContext";

function useSocket(
  set_contacts: React.Dispatch<React.SetStateAction<IContact[]>>,
  set_messages: React.Dispatch<React.SetStateAction<IMessage[]>>
) {
  const { set_user } = useContext(AuthContext);

  useEffect(() => {
    socket.connect();

    // Listen for changes in online status
    socket.on("online", (status, username) => {
      // Update SideContactsBar UI with online status of contacts list
      set_contacts((previous_contacts: IContact[]) => {
        return [...previous_contacts].map((c) => {
          if (c.username === username) {
            c.online = status;
          }
          return c;
        });
      });
    });

    // Listen for newly added contacts
    socket.on("contacts", (contacts) => {
      // Update SideContactsBar UI with user's new contacts list
      set_contacts(contacts);
    });

    // Listen for newly sent messages
    socket.on("messages", (messages) => {
      // Update Chat's UI with new messages
      set_messages(messages);
    });

    // Listen for direct messages
    socket.on("direct_message", (message) => {
      // Update Chat's UI with new messages
      set_messages((previous_messages) => [message, ...previous_messages]);
    });

    // Listen for connection errors
    socket.on("connect_error", () => {
      set_user({ logged_in: false });
    });

    return () => {
      // Cleanup events
      socket.off("online");
      socket.off("contacts");
      socket.off("messages");
      socket.off("direct_message");
      socket.off("connect_error");
    };
  }, [set_user, set_contacts, set_messages, socket]);
}

function Dashboard() {
  const [contacts, set_contacts] = useState([
    {
      username: "fake username 1",
      contact_id: "fake contact id 1",
      online: true,
    },
    {
      username: "fake username 2",
      contact_id: "fake contact id 2",
      online: false,
    },
  ]);

  const [contact_index, set_contact_index] = useState(0);
  const [messages, set_messages] = useState([]);

  useSocket(set_contacts, set_messages);

  return (
    <>
      <ContactsContext.Provider value={{ contacts, set_contacts }}>
        <Grid
          as={Tabs}
          onChange={(_) => (index: number) => {
            set_contact_index(index);
          }}
          templateColumns="repeat(10, 1fr)"
          w="100vw"
          h="100vh"
        >
          <GridItem colSpan={1}>
            <SideNavBar />
          </GridItem>
          <GridItem colSpan={7} maxW="100%" maxH="100vh">
            <MessagesContext.Provider value={{ messages, set_messages }}>
              {contacts.length > 0 ? (
                <Chat contact_id={contacts[contact_index].contact_id} />
              ) : (
                <p style={{ marginTop: "50vh" }}>Invite someone to chat!</p>
              )}
            </MessagesContext.Provider>
          </GridItem>
          <GridItem colSpan={2}>
            <SideContactsBar />
          </GridItem>
        </Grid>
      </ContactsContext.Provider>
    </>
  );
}

export default Dashboard;
