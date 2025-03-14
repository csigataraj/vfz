import { renderHook } from "@testing-library/react";
import { useMediaQueryStore } from "../store";
import useMedia from "./useMedia";
import { MediaQuery } from "../interfaces/media";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("useMedia Hook", () => {
  const mockMedia = [
    {
      id: "1",
      title: "Movie 1",
      genre: "Action",
      type: "movie",
      description: "",
    },
    {
      id: "2",
      title: "Movie 2",
      genre: "Drama",
      type: "movie",
      description: "",
    },
    {
      id: "3",
      title: "Series 1",
      genre: "Action",
      type: "series",
      description: "",
    },
    {
      id: "4",
      title: "Book 1",
      genre: "Fantasy",
      type: "book",
      description: "",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    const mockQueryStore = {
      query: {} as MediaQuery,
    };

    const mediaQueryStore = useMediaQueryStore.getState();
    mediaQueryStore.query = mockQueryStore.query;

    useMediaQueryStore.setState({
      ...mediaQueryStore,
    });

    jest
      .mocked(require("@tanstack/react-query").useQuery)
      .mockImplementation(() => ({
        data: mockMedia,
      }));
  });

  it("should filter media by genre correctly", async () => {
    const genreQuery: MediaQuery = { genre: "Action" };

    const mediaQueryStore = useMediaQueryStore.getState();
    mediaQueryStore.query = genreQuery;

    useMediaQueryStore.setState({
      ...mediaQueryStore,
    });

    jest
      .mocked(require("@tanstack/react-query").useQuery)
      .mockImplementation(() => ({
        data: mockMedia.filter((item) => item.genre === genreQuery.genre),
      }));

    const { result } = renderHook(() => useMedia());

    expect(result.current.data).toEqual([
      {
        id: "1",
        title: "Movie 1",
        genre: "Action",
        type: "movie",
        description: "",
      },
      {
        id: "3",
        title: "Series 1",
        genre: "Action",
        type: "series",
        description: "",
      },
    ]);
  });

  it("should filter media by search text correctly", async () => {
    const searchTextQuery: MediaQuery = { searchText: "Movie" };

    const mediaQueryStore = useMediaQueryStore.getState();
    mediaQueryStore.query = searchTextQuery;

    useMediaQueryStore.setState({
      ...mediaQueryStore,
    });

    jest
      .mocked(require("@tanstack/react-query").useQuery)
      .mockImplementation(() => ({
        data: mockMedia.filter((item) =>
          item.title.includes(searchTextQuery.searchText as string)
        ),
      }));

    const { result } = renderHook(() => useMedia());

    expect(result.current.data).toEqual([
      {
        id: "1",
        title: "Movie 1",
        genre: "Action",
        type: "movie",
        description: "",
      },
      {
        id: "2",
        title: "Movie 2",
        genre: "Drama",
        type: "movie",
        description: "",
      },
    ]);
  });

  it("should filter media by type correctly", async () => {
    const typeQuery: MediaQuery = { type: "book" };

    const mediaQueryStore = useMediaQueryStore.getState();
    mediaQueryStore.query = typeQuery;

    useMediaQueryStore.setState({
      ...mediaQueryStore,
    });

    jest
      .mocked(require("@tanstack/react-query").useQuery)
      .mockImplementation(() => ({
        data: mockMedia.filter((item) => item.type === typeQuery.type),
      }));

    const { result } = renderHook(() => useMedia());

    expect(result.current.data).toEqual([
      {
        id: "4",
        title: "Book 1",
        genre: "Fantasy",
        type: "book",
        description: "",
      },
    ]);
  });

  it("should handle multiple filters together", async () => {
    const combinedQuery: MediaQuery = { genre: "Action", searchText: "Series" };

    const mediaQueryStore = useMediaQueryStore.getState();
    mediaQueryStore.query = combinedQuery;

    useMediaQueryStore.setState({
      ...mediaQueryStore,
    });

    jest
      .mocked(require("@tanstack/react-query").useQuery)
      .mockImplementation(() => ({
        data: mockMedia.filter(
          (item) =>
            item.genre === combinedQuery.genre &&
            item.title.includes(combinedQuery.searchText as string)
        ),
      }));

    const { result } = renderHook(() => useMedia());

    expect(result.current.data).toEqual([
      {
        id: "3",
        title: "Series 1",
        genre: "Action",
        type: "series",
        description: "",
      },
    ]);
  });
});
