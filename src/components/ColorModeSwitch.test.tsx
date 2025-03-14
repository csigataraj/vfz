import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

jest.mock("@chakra-ui/react", () => {
  const originalModule = jest.requireActual("@chakra-ui/react");
  return {
    ...originalModule,
    useColorMode: jest.fn(),
  };
});

describe("ColorModeSwitch Component", () => {
  const mockUseColorMode = require("@chakra-ui/react").useColorMode;
  it("should render with the light mode icon (moon) when colorMode is light", () => {
    mockUseColorMode.mockReturnValue({
      colorMode: "light",
      toggleColorMode: jest.fn(),
    });

    render(
      <ChakraProvider>
        <ColorModeSwitch />
      </ChakraProvider>
    );

    expect(screen.getByTestId("light-mode-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("dark-mode-icon")).not.toBeInTheDocument();
  });

  it("should render with the dark mode icon (sun) when colorMode is dark", () => {
    mockUseColorMode.mockReturnValue({
      colorMode: "dark",
      toggleColorMode: jest.fn(),
    });

    render(
      <ChakraProvider>
        <ColorModeSwitch />
      </ChakraProvider>
    );

    expect(screen.getByTestId("dark-mode-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("light-mode-icon")).not.toBeInTheDocument();
  });

  it("should call toggleColorMode when the switch is clicked", () => {
    const toggleColorModeMock = jest.fn();
    mockUseColorMode.mockReturnValue({
      colorMode: "light",
      toggleColorMode: toggleColorModeMock,
    });

    render(
      <ChakraProvider>
        <ColorModeSwitch />
      </ChakraProvider>
    );

    const switchElement = screen.getByRole("checkbox");
    fireEvent.click(switchElement);

    expect(toggleColorModeMock).toHaveBeenCalledTimes(1);
  });
});
