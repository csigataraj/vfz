import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useMediaQueryStore } from "../store";
import { useState } from "react";
import { typeDictionary } from "../utils/utils";

const TypeSelector = () => {
  const typesToRender: string[] = ["All", "Books", "Movies", "Series"];
  const setSelectedType = useMediaQueryStore((s) => s.selectType);
  const [dropdownType, setDropDownType] = useState("All");

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Type: {dropdownType}
      </MenuButton>
      <MenuList>
        {typesToRender.map((type) => (
          <MenuItem
            onClick={() => {
              setDropDownType(type);
              setSelectedType(typeDictionary[type]);
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
