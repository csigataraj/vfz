import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { useMediaQueryStore } from '../store';
import useYears from '../hooks/useYears';

const YearSelector = () => {
  const years = ['All', ...useYears()];
  const selectedYear = useMediaQueryStore((s) => s.query.year);
  const setSelectedYear = useMediaQueryStore((s) => s.selectYear);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        marginLeft={{ base: 0, md: 2 }}
        marginTop={{ base: 2, md: 0 }}
      >
        {`Year: ${selectedYear || 'All'}`}
      </MenuButton>
      <MenuList maxHeight="300px" overflowY="auto">
        {years.map((year) => (
          <MenuItem
            onClick={() => {
              setSelectedYear(year === 'All' ? '' : year);
            }}
            key={year}
          >
            {year}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default YearSelector;
