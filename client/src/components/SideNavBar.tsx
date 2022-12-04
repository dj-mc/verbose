import { HStack, VStack } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

function SideNavBar() {
  return (
    <>
      <VStack>
        <ThemeToggle />
        <HStack>
          <p>Nav</p>
        </HStack>
      </VStack>
    </>
  );
}

export default SideNavBar;
