import { useQuery } from "@tanstack/react-query";
import { media } from "../data/media";
import { useMediaQueryStore } from "../store";
import { Media, MediaQuery } from "../interfaces/media";

const getFilteredMedia = (query?: MediaQuery) => {
  let result = media;

  if (query?.genre) {
    result = result.filter((item) => item.genre === query.genre);
  }
  if (query?.searchText) {
    result = result.filter((item) => item.title.includes(query.searchText!));
  }
  if (query?.type && query.type !== "All") {
    result = result.filter((item) => item.type === query.type);
  }

  return result;
};

const useMedia = (): {
  data: Media[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const query = useMediaQueryStore((state) => state.query);

  return useQuery<Media[]>({
    queryKey: ["media", query],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(getFilteredMedia(query)), 1000);
      });
      },//placeholder for backend call
  });
}; 

export default useMedia;
