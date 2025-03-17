import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Provide routing context
import NavBar from './NavBar'; // Import NavBar component

describe('NavBar Component', () => {
  it("should render the clickable logo and link to '/'", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('Star icon'); // Query by accessible `alt` text
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/star.svg');

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should render the `SearchBar` component', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Check if the SearchBar component is rendering (placeholder implies it exists)
    const searchBar = screen.getByPlaceholderText(/search media/i);
    expect(searchBar).toBeInTheDocument();
  });

  it('should render the `ColorModeSwitch` component', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Check if ColorModeSwitch is rendering via its expected structure
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeInTheDocument();
  });

  it('should apply layout properties to the `HStack` container', () => {
    const { container } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Check that HStack spacing and padding are applied
    const hStack = container.querySelector('.chakra-stack');
    expect(hStack).toBeInTheDocument();
    expect(hStack).toHaveStyle('padding: 10px'); // Matches NavBar props
    expect(hStack).toHaveStyle('margin-bottom: 4px'); // Matches NavBar props
  });
});
