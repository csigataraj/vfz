import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useMediaQueryStore } from "../store";
import { useState } from "react";

const getType = (type: string) => {
  switch (type) {
    case "Books":
      return "book";
    case "Movies":
      return "movie";
    case "Series":
      return "series";
    default:
      return "All";
  }
};

const TypeSelector = () => {
  const types = ["All", "Books", "Movies", "Series"];
  const setSelectedType = useMediaQueryStore((s) => s.selectType);
  const [dropdownType, setDropDownType] = useState("All");

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Type: {dropdownType}
      </MenuButton>
      <MenuList>
        {types.map((type) => (
          <MenuItem
            onClick={() => {
              setDropDownType(type);
              setSelectedType(getType(type));
            }}
            key={type}
          >
            {type}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default TypeSelector;
