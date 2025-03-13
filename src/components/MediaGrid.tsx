import { GridItem, SimpleGrid } from "@chakra-ui/react";
import MediaCard from "./MediaCard";
import useMedia from "../hooks/useMedia";

const MediaGrid = () => {
  const { data } = useMedia();

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding={"10px"}
    >
      {data?.map((item) => (
        <GridItem key={item.id}>
          <MediaCard media={item} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default MediaGrid;
