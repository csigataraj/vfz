import { Heading } from "@chakra-ui/react";
import useMediaQueryStore from "../store";
import { MediaQuery } from "../interfaces/media";

const DynamicHeading = () => {
  const query = useMediaQueryStore((s) => s.query);

  const getType = (query: MediaQuery) => {
    if (query.type !== "All") {
      if (query.genre) {
        return query.type || "Media";
      } else if (query.type) {
        return (
          query.type.charAt(0).toUpperCase() + query.type.slice(1) || "Media"
        );
      }
    }
  };
  const heading = `${query.genre || ""} ${getType(query) || "Media"} list`;

  return (
    <Heading as={"h1"} marginY={5} fontSize={"5xl"}>
      {heading}
    </Heading>
  );
};

export default DynamicHeading;
