import { render, screen, fireEvent } from "@testing-library/react";
import GenreSelector from "./GenreSelector";
import { useMediaQueryStore } from "../store";
import useGenres from "../hooks/useGenres";

jest.mock("../hooks/useGenres", () => jest.fn());

describe("GenreSelector Component", () => {
  let mockSelectGenre: jest.Mock;
  let mockGenres: string[];

  beforeEach(() => {
    mockSelectGenre = jest.fn();
    mockGenres = ["Action", "Comedy", "Horror", "Romance"];

    useMediaQueryStore.setState({
      query: { genre: "" },
      selectGenre: mockSelectGenre,
    });

    (useGenres as jest.Mock).mockReturnValue(mockGenres);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the default state with no genre selected", () => {
    render(<GenreSelector />);

    const button = screen.getByRole("button", { name: "Genre: All" });
    expect(button).toBeInTheDocument();
  });

  it("should render the correct selected genre", () => {
    useMediaQueryStore.setState({ query: { genre: "Action" } });

    render(<GenreSelector />);

    const button = screen.getByRole("button", { name: "Genre: Action" });
    expect(button).toBeInTheDocument();
  });

  it("should render all genres in the dropdown list", async () => {
    render(<GenreSelector />);

    const button = screen.getByRole("button", { name: "Genre: All" });
    fireEvent.click(button);

    await screen.findByRole("menu");

    const genres = ["All", ...mockGenres];
    genres.forEach((genre) => {
      expect(screen.getByRole("menuitem", { name: genre })).toBeInTheDocument();
    });
  });

  it("should call selectGenre with the correct value when a genre is selected", async () => {
    render(<GenreSelector />);

    const button = screen.getByRole("button", { name: "Genre: All" });
    fireEvent.click(button);

    await screen.findByRole("menu");

    const genreToSelect = "Comedy";
    const menuItem = await screen.findByRole("menuitem", {
      name: genreToSelect,
    });
    fireEvent.click(menuItem);

    expect(mockSelectGenre).toHaveBeenCalledTimes(1);
    expect(mockSelectGenre).toHaveBeenCalledWith(genreToSelect);
  });

  it('should call selectGenre with "" when "All" is selected', async () => {
    render(<GenreSelector />);

    const button = screen.getByRole("button", { name: "Genre: All" });
    fireEvent.click(button);

    await screen.findByRole("menu");

    const menuItem = await screen.findByRole("menuitem", { name: "All" });
    fireEvent.click(menuItem);

    expect(mockSelectGenre).toHaveBeenCalledTimes(1);
    expect(mockSelectGenre).toHaveBeenCalledWith("");
  });
});
