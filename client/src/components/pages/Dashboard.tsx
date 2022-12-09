import { Center, Grid, GridItem, Tabs } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import Chat from "../Chat";
import ContactsContext, { IContact } from "../ContactsContext";
import SideContactsBar from "../SideContactsBar";
import SideNavBar from "../SideNavBar";
import socket from "../../socket-io.js";
import { AuthContext } from "../UserContext";

function useSocket(
  set_contacts: React.Dispatch<React.SetStateAction<IContact[]>>
) {
  const { set_user } = useContext(AuthContext);
  useEffect(() => {
    socket.connect();
    // Listen for newly added contacts
    socket.on("contacts", (contacts) => {
      console.log('socket.on("contacts"): set_contacts:', contacts);
      // Update UI with user's new contacts list
      set_contacts(contacts);
    });

    // Listen for changes in online status
    socket.on("online", (status, username) => {
      // Update UI with contacts list online status
      set_contacts((previous_contacts: IContact[]) => {
        console.log('socket.on("online"): set_contacts:', previous_contacts);
        return [...previous_contacts].map((c) => {
          if (c.username === username) {
            c.online = status;
          }
          return c;
        });
      });
    });

    // Register callback to connect_error event
    socket.on("connect_error", () => {
      set_user({ logged_in: false });
    });

    // Cleanup callback registered to connect_error event
    return () => {
      socket.off("connect_error");
    };
  }, [set_user, set_contacts]);
}

function Dashboard() {
  const [contacts, set_contacts] = useState([]);

  useSocket(set_contacts);

  return (
    <>
      <ContactsContext.Provider value={{ contacts, set_contacts }}>
        <Grid templateColumns="repeat(10, 1fr)" w="100vw" h="100vh" as={Tabs}>
          <GridItem colSpan={1}>
            <SideNavBar />
          </GridItem>
          <GridItem colSpan={7}>
            <Center w="100%" h="100%">
              <Chat />
            </Center>
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
