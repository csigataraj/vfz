import { Card, CardBody, HStack, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Media } from '../interfaces/media';
import { useFavoritesStore } from '../store';
import { FaRegStar, FaStar } from 'react-icons/fa';

const MediaCard = ({ media }: { media: Media }) => {
  const { colorMode } = useColorMode();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites[media.id] || false;

  return (
    <Card
      role="region"
      backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
    >
      <HStack justifyContent={'space-between'}>
        <Link to={`/${media.id}`} aria-label={media.title}>
          <CardBody>{media.title}</CardBody>
        </Link>
        {isFavorite ? (
          <FaStar
            role="img"
            color="red"
            size={25}
            onClick={() => toggleFavorite(media.id)}
            style={{ marginRight: 8 }}
            aria-label="star-filled"
          />
        ) : (
          <FaRegStar
            role="img"
            onClick={() => toggleFavorite(media.id)}
            style={{ marginRight: 8 }}
            size={25}
            aria-label="star-empty"
          />
        )}
      </HStack>
    </Card>
  );
};

export default MediaCard;
