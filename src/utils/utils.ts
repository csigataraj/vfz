import { MediaQuery } from "../interfaces/media";

export const getTypeForDynamicHeading = (query: MediaQuery) =>
  query.genre
    ? query.type || "media"
    : query.type
      ? query.type.charAt(0).toUpperCase() + query.type.slice(1)
      : "Media";

export const getDynamicHeading = (query: MediaQuery) =>
  `${query.genre ? query.genre + " " : ""}${getTypeForDynamicHeading(query) || "Media"} list`;

export const typeDictionary: { [key: string]: string } = {
  Books: "book",
  Movies: "movie",
  Series: "series",
  All: "",
};
