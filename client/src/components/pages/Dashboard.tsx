import { Center, Grid, GridItem, Tabs } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import Chat from "../Chat";
import ContactsContext from "../ContactsContext";
import SideContactsBar from "../SideContactsBar";
import SideNavBar from "../SideNavBar";
import socket from "../../socket-io.js";
import { AuthContext } from "../UserContext";

function useSocket() {
  const { set_user } = useContext(AuthContext);
  useEffect(() => {
    socket.connect();

    // Register callback to connect_error event
    socket.on("connect_error", () => {
      set_user({ logged_in: false });
    });

    // Cleanup callback registered to connect_error event
    return () => {
      socket.off("connect_error");
    };
  }, [set_user]);
}

function Dashboard() {
  useSocket();
  const [contacts, set_contacts] = useState([
    { username: "Alice", online: false },
    { username: "Robert", online: true },
    { username: "Seph", online: false },
  ]);
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
