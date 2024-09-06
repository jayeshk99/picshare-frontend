import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { login } from '../../services/userApis';

jest.mock('../../services/userApis', () => ({
  login: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the login form correctly', () => {
    render(<Login />);

    expect(screen.getByText('PicShare')).toBeInTheDocument();
    expect(screen.getByText('Login to start sharing')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('shows validation error when username is invalid', async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'invalid_username!!' },
    });
    fireEvent.click(screen.getByText('Log In'));

    expect(
      await screen.findByText(
        'Username must be 3-16 characters and can only include letters, numbers, dots, underscores, or hyphens.'
      )
    ).toBeInTheDocument();
  });

  test('calls login function and navigates on successful login', async () => {
    (login as jest.Mock).mockResolvedValueOnce({});
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'valid_username' },
    });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('valid_username');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('displays error message when login fails', async () => {
    (login as jest.Mock).mockRejectedValueOnce(new Error('Failed to login'));
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'valid_username' },
    });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(screen.getByText('Failed to login')).toBeInTheDocument();
    });
  });

  test('does not call login API if username is invalid', async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'ab' }, // Less than 3 characters
    });
    fireEvent.click(screen.getByText('Log In'));

    await waitFor(() => {
      expect(login).not.toHaveBeenCalled();
    });
  });

  test('updates input field when typing a username', () => {
    render(<Login />);

    const input = screen.getByPlaceholderText('Username');
    fireEvent.change(input, { target: { value: 'valid_username' } });

    expect(input).toHaveValue('valid_username');
  });
});
