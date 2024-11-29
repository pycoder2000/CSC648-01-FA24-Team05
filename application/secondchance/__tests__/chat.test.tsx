import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from '@/app/components/chat/Chat';

describe('Real-time Chat Functionality', () => {
  test('renders chat component', () => {
    render(<Chat />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  test('allows user to send message', () => {
    render(<Chat />);
    fireEvent.change(screen.getByPlaceholderText('Type a message'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByText('Send'));
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
