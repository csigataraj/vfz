import { media } from "../data/media";

const useMediaDetails = (id: string) => media.find(item=>item.id === id); //placeholder for backend call

export default useMediaDetails;
