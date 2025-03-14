import {
  getDynamicHeading,
  getTypeForDynamicHeading,
  typeDictionary,
} from "./utils";
import { MediaQuery } from "../interfaces/media";

describe("Media Query Utilities", () => {
  describe("getTypeForDynamicHeading()", () => {
    it("should return the type when genre is present", () => {
      const query: MediaQuery = { type: "Books", genre: "Fantasy" };
      expect(getTypeForDynamicHeading(query)).toBe("Books");
    });

    it("should default to 'media' when genre is present and type is undefined", () => {
      const query: MediaQuery = { genre: "Fantasy" };
      expect(getTypeForDynamicHeading(query)).toBe("media");
    });

    it("should return capitalized type when genre is absent", () => {
      const query: MediaQuery = { type: "books" };
      expect(getTypeForDynamicHeading(query)).toBe("Books");
    });

    it("should default to 'Media' when both type and genre are undefined", () => {
      const query: MediaQuery = {};
      expect(getTypeForDynamicHeading(query)).toBe("Media");
    });
  });

  describe("getDynamicHeading()", () => {
    it("should return a heading with genre and type when both are present", () => {
      const query: MediaQuery = { type: "movies", genre: "Action" };
      expect(getDynamicHeading(query)).toBe("Action movies list");
    });

    it("should return a heading with just genre when genre is present and type is empty string", () => {
      const query: MediaQuery = { type: "", genre: "Fantasy" };
      expect(getDynamicHeading(query)).toBe("Fantasy media list");
    });

    it("should return a heading with capitalized type when genre is absent", () => {
      const query: MediaQuery = { type: "movies" };
      expect(getDynamicHeading(query)).toBe("Movies list");
    });

    it("should return a heading with default 'Media list' when both type and genre are undefined", () => {
      const query: MediaQuery = {};
      expect(getDynamicHeading(query)).toBe("Media list");
    });

    it("should return a heading with just type capitalized when genre is absent and type is empty string", () => {
      const query: MediaQuery = { type: "" };
      expect(getDynamicHeading(query)).toBe("Media list");
    });
  });
});
