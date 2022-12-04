import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button
        onClick={() => toggleColorMode()}
        className="theme-toggle"
        // top="0"
        // left="0"
        // pos="absolute"
        size={["xs", "sm", "md"]}
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
