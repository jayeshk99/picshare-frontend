import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageCard from './ImageCard';
import { IImageData, CardType } from '../../types/home';

const mockImage: IImageData = {
  id: '1',
  imageUrl: 'https://via.placeholder.com/150',
  title: 'Test Image',
  createdBy: 'user1',
  user: {
    id: 'user1',
    userName: 'John Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  favourites: [
    {
      userId: 'user1',
      postId: '1',
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockToggleFavorite = jest.fn();

describe('ImageCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ImageCard with image, title, and username', () => {
    render(
      <ImageCard
        image={mockImage}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
        cardType="home"
        isLoggedIn={true}
      />
    );

    const imageElement = screen.getByAltText('Test Image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockImage.imageUrl);

    expect(screen.getByText(mockImage.title)).toBeInTheDocument();

    expect(screen.getByText(mockImage.user.userName)).toBeInTheDocument();
  });

  test('renders favorite button when user is logged in', () => {
    render(
      <ImageCard
        image={mockImage}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
        cardType="home"
        isLoggedIn={true}
      />
    );

    const favoriteButton = screen.getByLabelText('add to favorites');
    expect(favoriteButton).toBeInTheDocument();
  });

  test('does not render favorite button when user is not logged in', () => {
    render(
      <ImageCard
        image={mockImage}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
        cardType="home"
        isLoggedIn={false}
      />
    );

    const favoriteButton = screen.queryByLabelText('add to favorites');
    expect(favoriteButton).not.toBeInTheDocument();
  });

  test('calls toggleFavorite function when favorite button is clicked', async () => {
    render(
      <ImageCard
        image={mockImage}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
        cardType="home"
        isLoggedIn={true}
      />
    );

    const favoriteButton = screen.getByLabelText('add to favorites');
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(mockImage.id);
  });

  test('renders favorite icon with correct color when isFavorite is true', () => {
    render(
      <ImageCard
        image={mockImage}
        isFavorite={true}
        toggleFavorite={mockToggleFavorite}
        cardType="home"
        isLoggedIn={true}
      />
    );

    const favoriteButton = screen.getByLabelText('add to favorites');
    const favoriteIcon = favoriteButton.querySelector('svg');

    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveClass('MuiSvgIcon-root');
  });

  test('opens modal when image is clicked', () => {
    render(
      <ImageCard
        image={mockImage}
        isFavorite={false}
        toggleFavorite={mockToggleFavorite}
        cardType="home"
        isLoggedIn={true}
      />
    );

    const imageElement = screen.getByAltText('Test Image');
    fireEvent.click(imageElement);

    const modalElement = screen.getByRole('presentation');
    expect(modalElement).toBeInTheDocument();
  });
});
