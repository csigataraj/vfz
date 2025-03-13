import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useMediaQueryStore from "../store";
import { useState } from "react";
import useGenres from "../hooks/useGenres";

const GenreSelector = () => {
  const genres = ["All", ...useGenres()];
  const selectedGenre = useMediaQueryStore((s) => s.query.genre);
  const setSelectedGenre = useMediaQueryStore((s) => s.selectGenre);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Genre: {selectedGenre || "All"}
      </MenuButton>
      <MenuList>
        {genres.map((genre) => (
          <MenuItem
            onClick={() => {
              setSelectedGenre(genre);
            }}
            key={genre}
          >
            {genre}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GenreSelector;
