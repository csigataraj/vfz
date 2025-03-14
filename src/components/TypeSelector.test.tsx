import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TypeSelector from './TypeSelector';
import { useMediaQueryStore } from '../store';
import { typeDictionary } from '../utils/utils';

jest.mock('../store', () => ({
  useMediaQueryStore: jest.requireActual('zustand').create(() => ({
    selectType: jest.fn(),
  })),
}));

describe('TypeSelector Component', () => {
  let mockSelectType: jest.Mock;

  beforeEach(() => {
    const store = useMediaQueryStore.getState();
    mockSelectType = jest.fn();

    store.selectType = mockSelectType;

    useMediaQueryStore.setState({
      ...store,
    });

    jest.clearAllMocks();
  });

  it('should render correctly with default state', () => {
    render(<TypeSelector />);

    const button = screen.getByRole('button', { name: 'Type: All' });
    expect(button).toBeInTheDocument();
  });

  it('should display all types in the dropdown when clicked', async () => {
    render(<TypeSelector />);

    const button = screen.getByRole('button', { name: 'Type: All' });
    fireEvent.click(button);

    await screen.findByRole('menu');

    const types = ['All', 'Books', 'Movies', 'Series'];
    await waitFor(() => {
      types.forEach((type) => {
        expect(
          screen.getByRole('menuitem', { name: type })
        ).toBeInTheDocument();
      });
    });
  });

  it('should update the dropdown label and call selectType when a type is selected', async () => {
    render(<TypeSelector />);

    const button = screen.getByRole('button', { name: 'Type: All' });
    fireEvent.click(button);

    await screen.findByRole('menu');

    const menuItem = await screen.findByRole('menuitem', { name: 'Movies' });
    fireEvent.click(menuItem);

    expect(
      screen.getByRole('button', { name: 'Type: Movies' })
    ).toBeInTheDocument();

    expect(mockSelectType).toHaveBeenCalledTimes(1);
    expect(mockSelectType).toHaveBeenCalledWith(typeDictionary['Movies']);
  });

  it('should correctly call selectType with "" when "All" is selected', async () => {
    render(<TypeSelector />);

    const button = screen.getByRole('button', { name: 'Type: All' });
    fireEvent.click(button);

    await screen.findByRole('menu');

    const menuItem = await screen.findByRole('menuitem', { name: 'All' });
    fireEvent.click(menuItem);

    expect(
      screen.getByRole('button', { name: 'Type: All' })
    ).toBeInTheDocument();

    expect(mockSelectType).toHaveBeenCalledTimes(1);
    expect(mockSelectType).toHaveBeenCalledWith(typeDictionary['All']);
  });
});
