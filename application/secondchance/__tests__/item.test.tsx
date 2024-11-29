import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddItemModal from '@/app/components/modals/AddItemModal';

describe('Item Listing and Management', () => {
  test('renders add item modal', () => {
    render(<AddItemModal />);
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  test('allows user to add item', () => {
    render(<AddItemModal />);
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Bicycle' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'A mountain bike' },
    });
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('Item added successfully')).toBeInTheDocument();
  });
});
