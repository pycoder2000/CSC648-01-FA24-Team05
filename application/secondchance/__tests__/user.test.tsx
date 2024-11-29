import React from 'react';
import SignupModal from '@/app/components/modals/SignupModal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('User Registration', () => {
  test('renders signup modal', () => {
    render(<SignupModal />);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  test('allows user to register', () => {
    render(<SignupModal />);

    fireEvent.change(screen.getByPlaceholderText('Your name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your phone number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your birthday (YYYY-MM-DD)'), {
      target: { value: '1990-01-01' },
    });

    fireEvent.change(screen.getByLabelText('Select Your Country'), {
      target: { value: 'US' },
    });
    fireEvent.change(screen.getByLabelText('Select Your State'), {
      target: { value: 'CA' },
    });
    fireEvent.change(screen.getByLabelText('Select Your City'), {
      target: { value: 'San Francisco' },
    });

    const file = new File(['profile'], 'profile.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Upload Profile Picture'), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Registration successful')).toBeInTheDocument();
  });
});
