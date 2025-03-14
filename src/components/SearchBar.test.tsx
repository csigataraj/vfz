import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useMediaQueryStore } from "../store";
import SearchBar from "./SearchBar";

jest.mock("../store", () => ({
  useMediaQueryStore: jest.requireActual("zustand").create(() => ({
    query: { searchText: "" },
    search: jest.fn(),
  })),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("SearchBar Component", () => {
  let mockSearch: jest.Mock;
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockSearch = jest.fn((val: string) => {
      useMediaQueryStore.setState({
        query: { searchText: val },
      });
    });
    mockNavigate = jest.fn();
    jest.mocked(useNavigate).mockImplementation(() => mockNavigate);
    const store = useMediaQueryStore.getState();
    store.search = mockSearch;
    useMediaQueryStore.setState({
      ...store,
      query: { searchText: "" },
    });
    jest.clearAllMocks();
  });

  it("should render the input field initially without badge", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Search media"
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("should call search with the input text and navigate to '/' on form submission", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Search media"
    ) as HTMLInputElement;
    const form = screen.getByTestId("search-form");
    fireEvent.change(input, { target: { value: "test media" } });
    fireEvent.submit(form);
    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith("test media");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should render the badge when query.searchText exists and show its text", () => {
    useMediaQueryStore.setState({
      query: { searchText: "test badge" },
    });
    render(<SearchBar />);
    const badge = screen.getByRole("status");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("test badge");
  });

  it("should call search with an empty string when the badge close button is clicked", () => {
    useMediaQueryStore.setState({
      query: { searchText: "test badge" },
    });
    render(<SearchBar />);
    const closeButton = screen.getByTitle("Close");
    fireEvent.click(closeButton);
    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith("");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
