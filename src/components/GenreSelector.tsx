import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import useGenres from '../hooks/useGenres';
import { useMediaQueryStore } from '../store';

const GenreSelector = () => {
  const genres = ['All', ...useGenres()];
  const selectedGenre = useMediaQueryStore((s) => s.query.genre);
  const setSelectedGenre = useMediaQueryStore((s) => s.selectGenre);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        className="genre-selector"
        marginLeft={{ base: 0, sm: 2 }}
        marginTop={{ base: 2, sm: 0 }}
      >
        {`Genre: ${selectedGenre || 'All'}`}
      </MenuButton>
      <MenuList maxHeight="300px" overflowY="auto">
        {genres.map((genre) => (
          <MenuItem
            onClick={() => {
              setSelectedGenre(genre === 'All' ? '' : genre);
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
