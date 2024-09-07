import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../../pages/home/Home';
import { getPosts } from '../../services/userApis';

import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

jest.mock('../../services/userApis', () => ({
  getPosts: jest.fn(),
  getFavorites: jest.fn(),
  addToFavorites: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
const mockNavigate = jest.fn();

const mockPosts = [
  {
    id: '1',
    title: 'Test Image 1',
    imageUrl: 'https://example.com/image1.jpg',
    user: { userName: 'user1' },
    createdAt: '2024-06-08T00:00:00Z',
  },
];

describe('HomePage Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders no posts message when there are no posts', async () => {
    (getPosts as jest.Mock).mockResolvedValueOnce([]);
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/No posts are available at the moment/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/start sharing your own pictures/i)
    ).toBeInTheDocument();
  });

  test('renders posts when available', async () => {
    (getPosts as jest.Mock).mockResolvedValueOnce(mockPosts);
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(await screen.findByAltText('Test Image 1')).toBeInTheDocument();
    expect(screen.getByText('Test Image 1')).toBeInTheDocument();
  });

  test('renders login message when user is not logged in', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/to start sharing/i)).toBeInTheDocument();
    expect(screen.getByText(/log in/i));
  });

  test('renders Home tab, Favorites tab, Share Picture button, and Hi user message', () => {
    localStorage.setItem('userName', 'testUser');
    localStorage.setItem('userId', '123');
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('homeTab')).toBeInTheDocument();
    expect(screen.getByTestId('favoriteTab')).toBeInTheDocument();
    expect(screen.getByTestId('sharePicBtn')).toBeInTheDocument();
    expect(screen.getByText('Hi testUser')).toBeInTheDocument();
  });

  test('logs out user and navigates on home route', async () => {
    localStorage.setItem('userName', 'testUser');
    localStorage.setItem('userId', '123');
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const logOutBtn = screen.getByText(/Log out/i);
    expect(logOutBtn).toBeInTheDocument();
    fireEvent.click(logOutBtn);

    expect(localStorage.getItem('userId')).toBeNull();
    expect(logOutBtn).not.toBeInTheDocument();
  });

  test('handles tab change correctly', () => {
    localStorage.setItem('userName', 'testUser');
    localStorage.setItem('userId', '123');
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const homeTab = screen.getByTestId('homeTab');
    fireEvent.click(homeTab);
    expect(homeTab).toHaveClass('Mui-selected');
    const favoriteTab = screen.getByTestId('favoriteTab');
    fireEvent.click(favoriteTab);
    expect(favoriteTab).toHaveClass('Mui-selected');
  });
});
