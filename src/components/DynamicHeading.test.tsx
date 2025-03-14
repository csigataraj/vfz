import { render, screen } from '@testing-library/react';
import DynamicHeading from './DynamicHeading';
import { useMediaQueryStore } from '../store';
import { getDynamicHeading } from '../utils/utils';

jest.mock('../store', () => ({
  useMediaQueryStore: jest.fn(),
}));

jest.mock('../utils/utils', () => ({
  getDynamicHeading: jest.fn(),
}));

describe('DynamicHeading Component', () => {
  const mockUseMediaQueryStore = jest.mocked(useMediaQueryStore);
  const mockGetDynamicHeading = jest.mocked(getDynamicHeading);

  it('should render default heading when no genre or type is provided', () => {
    mockUseMediaQueryStore.mockReturnValue({
      genre: 'action',
      type: 'movie',
    });
    mockGetDynamicHeading.mockReturnValue('Action movie list');

    render(<DynamicHeading />);

    expect(
      screen.getByRole('heading', { name: 'Action movie list' })
    ).toBeInTheDocument();
  });
});
