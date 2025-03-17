import { render, screen, fireEvent } from '@testing-library/react';
import YearSelector from './YearSelector';
import { useMediaQueryStore } from '../store';
import useYears from '../hooks/useYears';

jest.mock('../hooks/useYears', () => jest.fn());

describe('YearSelector Component', () => {
  let mockSelectYear: jest.Mock;
  let mockYears: string[];

  beforeEach(() => {
    mockSelectYear = jest.fn();
    mockYears = ['2023', '2022', '2021'];

    useMediaQueryStore.setState({
      query: { year: '' },
      selectYear: mockSelectYear,
    });

    (useYears as jest.Mock).mockReturnValue(mockYears);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the default state with no year selected', () => {
    render(<YearSelector />);

    const button = screen.getByRole('button', { name: 'Year: All' });
    expect(button).toBeInTheDocument();
  });

  it('should render the correct selected year', () => {
    useMediaQueryStore.setState({ query: { year: '2022' } });

    render(<YearSelector />);

    const button = screen.getByRole('button', { name: 'Year: 2022' });
    expect(button).toBeInTheDocument();
  });

  it('should render all years in the dropdown list', async () => {
    render(<YearSelector />);

    const button = screen.getByRole('button', { name: 'Year: All' });
    fireEvent.click(button);

    await screen.findByRole('menu');

    const allYears = ['All', ...mockYears];
    allYears.forEach((year) => {
      expect(screen.getByRole('menuitem', { name: year })).toBeInTheDocument();
    });
  });

  it('should call selectYear with the correct value when a year is selected', async () => {
    render(<YearSelector />);

    const button = screen.getByRole('button', { name: 'Year: All' });
    fireEvent.click(button);

    await screen.findByRole('menu');

    const yearToSelect = '2021';
    const menuItem = await screen.findByRole('menuitem', {
      name: yearToSelect,
    });
    fireEvent.click(menuItem);

    expect(mockSelectYear).toHaveBeenCalledTimes(1);
    expect(mockSelectYear).toHaveBeenCalledWith(yearToSelect);
  });

  it('should call selectYear with "" when "All" is selected', async () => {
    render(<YearSelector />);

    const button = screen.getByRole('button', { name: 'Year: All' });
    fireEvent.click(button);

    await screen.findByRole('menu');

    const menuItem = await screen.findByRole('menuitem', { name: 'All' });
    fireEvent.click(menuItem);

    expect(mockSelectYear).toHaveBeenCalledTimes(1);
    expect(mockSelectYear).toHaveBeenCalledWith('');
  });
});
