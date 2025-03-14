import { GridItem, SimpleGrid } from "@chakra-ui/react";
import MediaCard from "./MediaCard";
import useMedia from "../hooks/useMedia";
import { useFavoritesStore, useMediaQueryStore } from "../store";

const MediaGrid = () => {
  const { data } = useMedia();
  const { favorites } = useFavoritesStore();
  const showFavorites = useMediaQueryStore((s) => s.query.showFavorites);

  const filteredData = showFavorites
    ? data?.filter((item) => Object.keys(favorites).includes(item.id))
    : data;

  if (!filteredData || filteredData.length === 0) return null;

  return (
    <SimpleGrid
      role="grid"
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding={"10px"}
    >
      {filteredData?.map((item) => (
        <GridItem key={item.id}>
          <MediaCard media={item} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default MediaGrid;
