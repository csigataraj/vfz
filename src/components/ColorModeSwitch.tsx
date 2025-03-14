import { HStack, Switch, useColorMode } from "@chakra-ui/react";
import { MdModeNight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack>
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        colorScheme="green"
      />
      {colorMode === "dark" ? (
        <WiDaySunny size={30} data-testid="dark-mode-icon" />
      ) : (
        <MdModeNight size={30} data-testid="light-mode-icon" />
      )}
    </HStack>
  );
};

export default ColorModeSwitch;
