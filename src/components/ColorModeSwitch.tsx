import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
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
        <WiDaySunny size={30} />
      ) : (
        <MdModeNight size={30} />
      )}
    </HStack>
  );
};

export default ColorModeSwitch;
