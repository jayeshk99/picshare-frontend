import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

const mockLoginHandler = jest.fn();

jest.mock('../../context/authContext', () => ({
  useAuth: () => ({
    isLoggedIn: false,
    loginHandler: mockLoginHandler,
  }),
}));

describe('Login Component', () => {
  test('renders Login component without crashing', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByText('PicShare')).toBeInTheDocument();
    expect(screen.getByText('Login to start sharing')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  });

  test('updates username input field correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const input = screen.getByPlaceholderText('Username') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'testUser' } });
    expect(input.value).toBe('testUser');
  });

  test('shows validation error for invalid username', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const input = screen.getByPlaceholderText('Username') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Username must be 3-16 characters and can only include letters, numbers, dots, underscores, or hyphens.'
        )
      ).toBeInTheDocument();
    });
  });

  test('calls loginHandler and navigates to home on successful login', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const input = screen.getByPlaceholderText('Username') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'validUser' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

    await waitFor(() => {
      expect(mockLoginHandler).toHaveBeenCalledWith('validUser');
    });
  });
});
