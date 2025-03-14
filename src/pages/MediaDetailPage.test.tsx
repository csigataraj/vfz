import { render, screen } from "@testing-library/react";
import MediaDetailPage from "./MediaDetailPage";
import { useParams } from "react-router-dom";
import useMediaDetails from "../hooks/useMediaDetails";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../hooks/useMediaDetails", () => jest.fn());

describe("MediaDetailPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display title and description from useMediaDetails", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useMediaDetails as jest.Mock).mockReturnValue({
      title: "Test Media Title",
      description: "This is a test media description.",
    });

    render(<MediaDetailPage />);

    expect(
      screen.getByRole("heading", { name: "Test Media Title" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is a test media description.")
    ).toBeInTheDocument();
  });

  it("should display an error message when media details are undefined", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "invalid-id" });
    (useMediaDetails as jest.Mock).mockReturnValue(undefined);

    render(<MediaDetailPage />);

    expect(
      screen.getByRole("heading", { name: "Oops..." })
    ).toBeInTheDocument();
    expect(screen.getByText("No media with that id.")).toBeInTheDocument();
  });
});
