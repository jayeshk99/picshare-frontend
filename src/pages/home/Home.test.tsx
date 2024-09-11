// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import HomePage from '../../pages/home/Home';
// import { getPosts } from '../../services/userApis';

// import { BrowserRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';

// jest.mock('../../services/userApis', () => ({
//   getPosts: jest.fn(),
//   getFavorites: jest.fn(),
//   addToFavorites: jest.fn(),
// }));

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => jest.fn(),
// }));
// const mockNavigate = jest.fn();

// const mockPosts = [
//   {
//     id: '1',
//     title: 'Test Image 1',
//     imageUrl: 'https://example.com/image1.jpg',
//     user: { userName: 'user1' },
//     createdAt: '2024-06-08T00:00:00Z',
//   },
// ];

// describe('HomePage Component', () => {
//   beforeEach(() => {
//     localStorage.clear();
//   });

//   test('renders no posts message when there are no posts', async () => {
//     (getPosts as jest.Mock).mockResolvedValueOnce([]);
//     render(
//       <BrowserRouter>
//         <HomePage />
//       </BrowserRouter>
//     );

//     expect(
//       screen.getByText(/No posts are available at the moment/i)
//     ).toBeInTheDocument();
//     expect(
//       screen.getByText(/start sharing your own pictures/i)
//     ).toBeInTheDocument();
//   });

//   test('renders login message when user is not logged in', () => {
//     render(
//       <BrowserRouter>
//         <HomePage />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/to start sharing/i)).toBeInTheDocument();
//     expect(screen.getByText(/log in/i));
//   });

//   test('renders Home tab, Favorites tab, Share Picture button, and Hi user message', () => {
//     localStorage.setItem('userName', 'testUser');
//     localStorage.setItem('userId', '123');
//     render(
//       <BrowserRouter>
//         <HomePage />
//       </BrowserRouter>
//     );

//     expect(screen.getByTestId('homeTab')).toBeInTheDocument();
//     expect(screen.getByTestId('favoriteTab')).toBeInTheDocument();
//     expect(screen.getByTestId('sharePicBtn')).toBeInTheDocument();
//     expect(screen.getByText('Hi testUser')).toBeInTheDocument();
//   });

//   test('logs out user and navigates on home route', async () => {
//     localStorage.setItem('userName', 'testUser');
//     localStorage.setItem('userId', '123');
//     render(
//       <BrowserRouter>
//         <HomePage />
//       </BrowserRouter>
//     );
//     const logOutBtn = screen.getByTestId('logout');
//     expect(logOutBtn).toBeInTheDocument();
//     fireEvent.click(logOutBtn);

//     expect(localStorage.getItem('userId')).toBeNull();
//     expect(logOutBtn).not.toBeInTheDocument();
//   });

//   test('handles tab change correctly', () => {
//     localStorage.setItem('userName', 'testUser');
//     localStorage.setItem('userId', '123');
//     render(
//       <BrowserRouter>
//         <HomePage />
//       </BrowserRouter>
//     );

//     const homeTab = screen.getByTestId('homeTab');
//     fireEvent.click(homeTab);
//     expect(homeTab).toHaveClass('Mui-selected');
//     const favoriteTab = screen.getByTestId('favoriteTab');
//     fireEvent.click(favoriteTab);
//     expect(favoriteTab).toHaveClass('Mui-selected');
//   });
// });

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './Home';
import { MemoryRouter } from 'react-router-dom';
import { PostProvider } from '../../context/postContext';
import { AuthProvider } from '../../context/authContext';
import * as postContext from '../../context/postContext';
import * as authContext from '../../context/authContext';
import { IImageData } from '../../types/home';

const mockPosts: IImageData[] = [
  {
    id: '1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    imageUrl: 'https://example.com/image1.jpg',
    title: 'Sample Image 1',
    createdBy: 'user1',
    user: {
      id: 'user1',
      userName: 'User One',
      createdAt: '2024-06-08T00:00:00Z',
      updatedAt: '2024-06-08T00:00:00Z',
    },
    favourites: [],
  },
  {
    id: '2',
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-04T00:00:00Z',
    imageUrl: 'https://example.com/image2.jpg',
    title: 'Sample Image 2',
    createdBy: 'user2',
    user: {
      id: 'user2',
      userName: 'User Two',
      createdAt: '2024-06-09T00:00:00Z',
      updatedAt: '2024-06-08T00:00:00Z',
    },
    favourites: [],
  },
];

const mockFetchData = jest.fn();

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.spyOn(postContext, 'usePost').mockReturnValue({
      error: null,
      fetchData: mockFetchData,
      addToFavouriteState: jest.fn(),
      isLoading: false,
      postData: [],
      totalPages: 1,
    });

    // Mocking useAuth
    jest.spyOn(authContext, 'useAuth').mockReturnValue({
      user: null,
      isLoggedIn: false,
      logoutHandler: jest.fn(),
      isLoading: false,
      loginHandler: jest.fn(),
    });
  });

  it('should render the login message when the user is not logged in', () => {
    render(
      <AuthProvider>
        <PostProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </PostProvider>
      </AuthProvider>
    );

    const loginMessage = screen.getByText(/login/i);
    expect(loginMessage).toBeInTheDocument();
    expect(loginMessage.closest('a')).toHaveAttribute('href', '/login');
  });

  it('should call fetchData on initial render', async () => {
    render(
      <AuthProvider>
        <PostProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </PostProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith(1, 12); // Ensure that fetchData is called with the correct page and post limit
    });
  });

  it('should display a "no posts available" message when no posts are fetched', () => {
    render(
      <AuthProvider>
        <PostProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </PostProvider>
      </AuthProvider>
    );

    const noPostsMessage = screen.getByText(
      /No posts are available at the moment/i
    );
    expect(noPostsMessage).toBeInTheDocument();
  });

  it('should render posts when postData is available', async () => {
    // const mockPosts = [
    //   {
    //     id: '1',
    //     title: 'Sample Image 1',
    //     favourites: [],
    //   },
    //   {
    //     id: '2',
    //     title: 'Sample Image 2',
    //     favourites: [],
    //   },
    // ];

    jest.spyOn(postContext, 'usePost').mockReturnValue({
      error: null,
      fetchData: mockFetchData,
      addToFavouriteState: jest.fn(),
      isLoading: false,
      postData: mockPosts,
      totalPages: 1,
    });

    render(
      <AuthProvider>
        <PostProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </PostProvider>
      </AuthProvider>
    );

    const postTitles = mockPosts.map((post) => screen.getByText(post.title));
    expect(postTitles.length).toBe(mockPosts.length);
    postTitles.forEach((title, index) => {
      expect(title).toHaveTextContent(mockPosts[index].title);
    });
  });

  it('should load more posts when scrolling down', async () => {
    let currentPage = 1;

    jest.spyOn(postContext, 'usePost').mockReturnValue({
      error: null,
      fetchData: mockFetchData,
      addToFavouriteState: jest.fn(),
      isLoading: false,
      postData: [],
      totalPages: 2,
    });

    render(
      <AuthProvider>
        <PostProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </PostProvider>
      </AuthProvider>
    );

    const scrollEvent = new Event('scroll');
    fireEvent(window, scrollEvent);

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledTimes(2); // Called on initial load and again on scroll
    });
  });
});
