import { Heading } from '@chakra-ui/react';
import { useMediaQueryStore } from '../store';
import { getDynamicHeading } from '../utils/utils';

const DynamicHeading = () => {
  const query = useMediaQueryStore((s) => s.query);

  return (
    <Heading as={'h1'} marginY={5} fontSize={'5xl'}>
      {getDynamicHeading(query)}
    </Heading>
  );
};

export default DynamicHeading;
