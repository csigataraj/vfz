import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

// Mock the useColorMode hook from Chakra UI
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
    // Mock useColorMode to return colorMode as 'light'
    mockUseColorMode.mockReturnValue({
      colorMode: "light",
      toggleColorMode: jest.fn(),
    });

    render(
      <ChakraProvider>
        <ColorModeSwitch />
      </ChakraProvider>
    );

    // Expect the moon icon (MdModeNight) to be in the document
    expect(screen.getByTestId("light-mode-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("dark-mode-icon")).not.toBeInTheDocument();
  });

  it("should render with the dark mode icon (sun) when colorMode is dark", () => {
    // Mock useColorMode to return colorMode as 'dark'

    mockUseColorMode.mockReturnValue({
      colorMode: "dark",
      toggleColorMode: jest.fn(),
    });

    render(
      <ChakraProvider>
        <ColorModeSwitch />
      </ChakraProvider>
    );

    // Expect the sun icon (WiDaySunny) to be in the document
    expect(screen.getByTestId("dark-mode-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("light-mode-icon")).not.toBeInTheDocument();
  });

  it("should call toggleColorMode when the switch is clicked", () => {
    // Create a mock toggleColorMode function
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

    // Simulate clicking the switch
    const switchElement = screen.getByRole("checkbox");
    fireEvent.click(switchElement);

    // Expect the toggleColorMode function to have been called once
    expect(toggleColorModeMock).toHaveBeenCalledTimes(1);
  });
});
