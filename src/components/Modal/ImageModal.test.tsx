import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageModal from './ImageModal';
import { IImageData } from '../../types/home';

const mockImage: IImageData = {
  id: '1',
  user: {
    userName: 'testUser',
    id: 'user1',
    createdAt: '2024-09-06T00:00:00Z',
    updatedAt: '2024-09-06T00:00:00Z',
  },
  createdBy: 'user1',
  imageUrl: 'https://example.com/test-image.jpg',
  title: 'Test Image',
  favourites: [
    {
      userId: 'user1',
      postId: '1',
    },
  ],
  createdAt: '2024-09-06T00:00:00Z',
  updatedAt: '2024-09-06T00:00:00Z',
};

describe('ImageModal Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  test('renders correctly when open', () => {
    render(<ImageModal open={true} onClose={onCloseMock} image={mockImage} />);

    const image = screen.getByAltText(mockImage.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImage.imageUrl);

    expect(screen.getByText(mockImage.user.userName)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(mockImage.createdAt).toLocaleDateString())
    ).toBeInTheDocument();

    expect(screen.getByRole('dialog')).toBeVisible();
  });

  test('triggers onClose when close button is clicked', () => {
    render(<ImageModal open={true} onClose={onCloseMock} image={mockImage} />);

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not render when open is false', () => {
    const { queryByRole } = render(
      <ImageModal open={false} onClose={onCloseMock} image={mockImage} />
    );

    expect(queryByRole('dialog')).toBeNull();
  });

  test('renders the correct image details', () => {
    render(<ImageModal open={true} onClose={onCloseMock} image={mockImage} />);

    const username = screen.getByText(mockImage.user.userName);
    const date = screen.getByText(
      new Date(mockImage.createdAt).toLocaleDateString()
    );

    expect(username).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
});
