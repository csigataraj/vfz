import { HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack padding="10px" marginBottom={4}>
      <Link to="/">
        <Image
          src="./assets/star.svg"
          boxSize={{ base: "20px", md: "40px" }}
          objectFit={"cover"}
        ></Image>
      </Link>
      <SearchBar />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
