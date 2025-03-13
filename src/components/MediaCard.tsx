import { Card, CardBody, HStack, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Media } from "../interfaces/media";
import { useFavoritesStore } from "../store";
import { FaRegStar, FaStar } from "react-icons/fa";

const MediaCard = ({ media }: { media: Media }) => {
  const { colorMode } = useColorMode();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites[media.id] || false;

  return (
    <Card backgroundColor={colorMode === "dark" ? "gray.700" : "gray.100"}>
      <HStack justifyContent={"space-between"}>
        <Link to={`/media/${media.id}`}>
          <CardBody>{media.title}</CardBody>
        </Link>
        {isFavorite ? (
          <FaStar
            color="red"
            onClick={() => toggleFavorite(media.id)}
            style={{ marginRight: 8 }}
          />
        ) : (
          <FaRegStar
            onClick={() => toggleFavorite(media.id)}
            style={{ marginRight: 8 }}
          />
        )}
      </HStack>
    </Card>
  );
};

export default MediaCard;
