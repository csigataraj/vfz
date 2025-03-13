import { Grid, Show, GridItem, Box, HStack } from "@chakra-ui/react";
import DynamicHeading from "../components/DynamicHeading";
import MediaGrid from "../components/MediaGrid";
import GenreList from "../components/GenreList";
import TypeSelector from "../components/TypeSelector";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{ base: `"main"`, lg: `"aside main"` }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX="5px">
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft="9px">
          <DynamicHeading />
          <HStack paddingBottom={5}>
            <TypeSelector />
          </HStack>
        </Box>
        <MediaGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
