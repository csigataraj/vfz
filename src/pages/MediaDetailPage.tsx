import useMediaDetails from '../hooks/useMediaDetails';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const MediaDetailPage = () => {
  const { id } = useParams();
  const details = useMediaDetails(id!);

  return details ? (
    <Box>
      <>
        <Heading size="4xl" mb={4}>
          {details.title}
        </Heading>
        <Text>{details.description}</Text>
      </>
    </Box>
  ) : (
    <Box padding={5}>
      <Heading>Oops...</Heading>
      <Text>No media with that id.</Text>
    </Box>
  );
};

export default MediaDetailPage;
