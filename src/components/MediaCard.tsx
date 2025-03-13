import { Card, CardBody, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Media } from "../interfaces/media";

const MediaCard = ({ media }: { media: Media }) => {
  const { colorMode } = useColorMode();

  return (
    <Link to={`/media/${media.id}`}>
      <Card backgroundColor={colorMode === "dark" ? "gray.700" : "gray.100"}>
        <CardBody flex={"none"}>{media.title}</CardBody>
      </Card>
    </Link>
  );
};

export default MediaCard;
