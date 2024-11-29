import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from '@/app/components/profile/UserProfile';

describe('User Profile Management', () => {
  test('renders user profile', () => {
    render(<UserProfile />);
    expect(screen.getByText('User Profile')).toBeInTheDocument();
  });

  test('allows user to update profile', () => {
    render(<UserProfile />);
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByText('Update Profile'));
    expect(screen.getByText('Profile updated successfully')).toBeInTheDocument();
  });
});
