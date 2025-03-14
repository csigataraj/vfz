import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

jest.mock("../components/NavBar", () => {
  return () => <div data-testid="mocked-nav-bar">Mocked NavBar</div>;
});

describe("Layout Component", () => {
  it("renders the NavBar component", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByTestId("mocked-nav-bar")).toBeInTheDocument();
  });

  it("renders the Box component with correct styles and attributes", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const layoutBox = screen.getByTestId("layout-box");
    expect(layoutBox).toBeInTheDocument();
    expect(layoutBox).toHaveStyle("padding: 5px");
  });

  it("renders the Outlet component", () => {
    const { container } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    const outletElement = container.querySelector("div");
    expect(outletElement).toBeTruthy();
  });
});
