import { HStack, Switch, Text } from "@chakra-ui/react";
import { useMediaQueryStore } from "../store";

const FavoritesSwitch = () => {
  const showFavorites = useMediaQueryStore((s) => s.query.showFavorites);
  const toggleFavorite = useMediaQueryStore((s) => s.toggleFavorites);

  return (
    <HStack marginRight={3}>
      <Switch
        isChecked={showFavorites}
        onChange={() => toggleFavorite(!showFavorites)}
        colorScheme="green"
      />
      {showFavorites ? <Text> Show All </Text> : <Text>Show Favorites</Text>}
    </HStack>
  );
};

export default FavoritesSwitch;
