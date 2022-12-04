import {
  Circle,
  Flex,
  HStack,
  Spacer,
  Tab,
  TabList,
  VStack,
} from "@chakra-ui/react";

function SideContactsBar() {
  return (
    <>
      <VStack pt="16px" borderLeft="1px solid grey" h="100%">
        <HStack justify="space-evenly" w="100%">
          <p>Friends</p>
        </HStack>
        <VStack as={TabList} border="none" borderTop="1px solid grey" w="80%">
          <Flex as={Tab} direction="row" w="100%">
            <Circle size="10px" bg="red.500" />
            <Spacer />
            <p>Alice</p>
          </Flex>
          <Flex as={Tab} direction="row" w="100%">
            <Circle size="10px" bg="red.500" />
            <Spacer />
            <p>Robert</p>
          </Flex>
          <Flex as={Tab} direction="row" w="100%">
            <Circle size="10px" bg="red.500" />
            <Spacer />
            <p>Seph</p>
          </Flex>
        </VStack>
      </VStack>
    </>
  );
}

export default SideContactsBar;
