import { Center, Grid, GridItem, Tabs } from "@chakra-ui/react";

import SideContactsBar from "../SideContactsBar";
import SideNavBar from "../SideNavBar";

function Dashboard() {
  return (
    <>
      <Grid templateColumns="repeat(10, 1fr)" w="100vw" h="100vh" as={Tabs}>
        <GridItem colSpan={1}>
          <SideNavBar />
        </GridItem>
        <GridItem colSpan={7}>
          <Center w="100%" h="100%">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
              earum odio adipisci ex, consequatur accusantium quidem quod, alias
              unde aperiam vitae in commodi soluta excepturi qui veniam.
            </p>
          </Center>
        </GridItem>
        <GridItem colSpan={2}>
          <SideContactsBar />
        </GridItem>
      </Grid>
    </>
  );
}

export default Dashboard;
