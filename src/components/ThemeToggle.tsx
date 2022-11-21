import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button
        onClick={() => toggleColorMode()}
        top="0"
        right="0"
        pos="absolute"
        m="1rem"
      >
        {colorMode === "dark" ? (
          <SunIcon color="yellow.300" />
        ) : (
          <MoonIcon color="blue.300" />
        )}
      </Button>
    </>
  );
}

export default ThemeToggle;
