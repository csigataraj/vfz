import { render, screen } from "@testing-library/react";
import useMedia from "../hooks/useMedia"; // Default import
import MediaGrid from "./MediaGrid";
import { useFavoritesStore, useMediaQueryStore } from "../store";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for testing context

function MediaCard({ media }: { media: { id: string; name: string } }) {
  return (
    <div role="griditem">
      <a href={`/${media.id}`}>{media.name}</a>
    </div>
  );
}

jest.mock("../hooks/useMedia", () => jest.fn());

jest.mock("../store", () => ({
  useFavoritesStore: jest.requireActual("zustand").create(() => ({
    favorites: {},
  })),
  useMediaQueryStore: jest.requireActual("zustand").create(() => ({
    query: { showFavorites: false },
  })),
}));

jest.mock("./MediaCard", () => MediaCard);

describe("MediaGrid Component", () => {
  let mockFavorites: Record<string, boolean>;
  let mockShowFavorites: boolean;

  beforeEach(() => {
    jest.clearAllMocks();

    mockFavorites = { "1": true, "2": true }; // Use boolean values to match type Record<string, boolean>
    mockShowFavorites = false;

    const favoritesStore = useFavoritesStore.getState();
    favoritesStore.favorites = mockFavorites;

    useFavoritesStore.setState({
      ...favoritesStore,
    });

    const mediaQueryStore = useMediaQueryStore.getState();
    mediaQueryStore.query.showFavorites = mockShowFavorites;

    useMediaQueryStore.setState({
      ...mediaQueryStore,
    });

    (useMedia as jest.Mock).mockReturnValue({
      data: [
        { id: "1", name: "Item 1" },
        { id: "2", name: "Item 2" },
        { id: "3", name: "Item 3" },
      ],
    });
  });

  it("should render all media items when showFavorites is false", () => {
    mockShowFavorites = false;

    const mediaQueryStore = useMediaQueryStore.getState();
    mediaQueryStore.query.showFavorites = mockShowFavorites;

    useMediaQueryStore.setState({
      ...mediaQueryStore,
    });

    render(
      <MemoryRouter>
        <MediaGrid />
      </MemoryRouter>
    );

    // Assert that links with correct names are rendered
    expect(screen.getByRole("link", { name: "Item 1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Item 2" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Item 3" })).toBeInTheDocument();

    // Assert correct number of rendered links
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("should render only favorites when showFavorites is true", () => {
    mockShowFavorites = true;

    const mediaQueryStore = useMediaQueryStore.getState();
    mediaQueryStore.query.showFavorites = mockShowFavorites;

    useMediaQueryStore.setState({
      ...mediaQueryStore,
    });

    render(
      <MemoryRouter>
        <MediaGrid />
      </MemoryRouter>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.queryByText("Item 3")).not.toBeInTheDocument();

    expect(screen.getAllByRole("griditem")).toHaveLength(2); // Assert correct number of grid items
  });

  it("should render nothing when filteredData is empty", () => {
    (useMedia as jest.Mock).mockReturnValue({ data: [] });

    render(
      <MemoryRouter>
        <MediaGrid />
      </MemoryRouter>
    );

    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    expect(screen.queryByRole("griditem")).not.toBeInTheDocument();
  });

  it("should apply responsive grid layout", () => {
    render(
      <MemoryRouter>
        <MediaGrid />
      </MemoryRouter>
    );

    const simpleGrid = screen.getByRole("grid");

    expect(simpleGrid).toBeInTheDocument();
    expect(simpleGrid).toHaveStyle("padding: 10px");
  });
});
