import { GridItem, SimpleGrid } from "@chakra-ui/react";
import MediaCard from "./MediaCard";
import useMedia from "../hooks/useMedia";
import { useFavoritesStore, useMediaQueryStore } from "../store";

const MediaGrid = () => {
  const { data } = useMedia();
  const { favorites } = useFavoritesStore();
  const showFavorites = useMediaQueryStore((s) => s.query.showFavorites);

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding={"10px"}
    >
      {showFavorites
        ? data
            ?.filter((item) => Object.keys(favorites).includes(item.id))
            .map((item) => (
              <GridItem key={item.id}>
                <MediaCard media={item} />
              </GridItem>
            ))
        : data?.map((item) => (
            <GridItem key={item.id}>
              <MediaCard media={item} />
            </GridItem>
          ))}
    </SimpleGrid>
  );
};

export default MediaGrid;
