import { Grid, GridItem, Box, HStack } from '@chakra-ui/react';
import DynamicHeading from '../components/DynamicHeading';
import MediaGrid from '../components/MediaGrid';
import TypeSelector from '../components/TypeSelector';
import GenreSelector from '../components/GenreSelector';
import FavoritesSwitch from '../components/FavoritesSwitch';

const HomePage = () => {
  return (
    <Grid>
      <GridItem>
        <Box paddingLeft="9px">
          <DynamicHeading />
          <HStack paddingBottom={5} justifyContent={'space-between'}>
            <Box>
              <TypeSelector />
              <GenreSelector />
            </Box>
            <FavoritesSwitch />
          </HStack>
        </Box>
        <MediaGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
