import { Button, Heading, HStack, List, ListItem } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import useMediaQueryStore from "../store";

const GenreList = () => {
  const selectedGenre = useMediaQueryStore((s) => s.query.genre);
  const setSelectedGenre = useMediaQueryStore((s) => s.selectGenre);
  const data = useGenres();

  return (
    <>
      <Heading fontSize={"2xl"} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data.map((item) => (
          <ListItem key={item} paddingY="5px">
            <HStack>
              <Button
                fontWeight={item === selectedGenre ? "bold" : "normal"}
                fontSize="lg"
                variant="link"
                whiteSpace={"normal"}
                textAlign={"left"}
                onClick={() => setSelectedGenre(item)}
              >
                {item}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
