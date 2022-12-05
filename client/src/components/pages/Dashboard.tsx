import { Center, Grid, GridItem, Tabs } from "@chakra-ui/react";
import { useState } from "react";

import Chat from "../Chat";
import ContactsContext from "../ContactsContext";
import SideContactsBar from "../SideContactsBar";
import SideNavBar from "../SideNavBar";

function Dashboard() {
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
