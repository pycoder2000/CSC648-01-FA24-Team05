import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RentalList from '@/app/components/rentals/RentalList';

describe('Rental Management', () => {
  test('renders rental list', () => {
    render(<RentalList />);
    expect(screen.getByText('Rentals')).toBeInTheDocument();
  });

  test('allows user to view rental details', () => {
    render(<RentalList />);
    fireEvent.click(screen.getByText('View Details'));
    expect(screen.getByText('Rental Details')).toBeInTheDocument();
  });
});
