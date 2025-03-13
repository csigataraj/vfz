import { Grid, GridItem, Box, HStack } from "@chakra-ui/react";
import DynamicHeading from "../components/DynamicHeading";
import MediaGrid from "../components/MediaGrid";
import TypeSelector from "../components/TypeSelector";
import GenreSelector from "../components/GenreSelector";

const HomePage = () => {
  return (
    <Grid>
      <GridItem>
        <Box paddingLeft="9px">
          <DynamicHeading />
          <HStack paddingBottom={5}>
            <TypeSelector />
            <GenreSelector />
          </HStack>
        </Box>
        <MediaGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
