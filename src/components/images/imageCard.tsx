import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CardType, IImageData } from '../../types/home';
import ImageModal from '../Modal/ImageModal';

interface ImageCardProps {
  image: IImageData;
  isFavorite: boolean;
  toggleFavorite: (id: string) => Promise<void>;
  cardType: CardType;
  favouriteId?: string;
  isLoggedIn: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  isFavorite,
  cardType,
  toggleFavorite,
  favouriteId,
  isLoggedIn,
}) => {
  const [open, setOpen] = useState(false);

  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (cardType === 'home') {
      await toggleFavorite(image.id);
    } else {
      await toggleFavorite(favouriteId as string);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={handleOpen}
      >
        <CardMedia
          component="img"
          height="200"
          image={image.imageUrl}
          alt={image.title}
          sx={{ borderRadius: '4px 4px 0 0' }}
        />
        <CardContent>
          <Typography
            textAlign={'center'}
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            {image.title}
          </Typography>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="body2" color="textSecondary">
                {image.user.userName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(image.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            {isLoggedIn && (
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavoriteClick}
                color={isFavorite ? 'error' : 'default'}
              >
                <FavoriteIcon />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </Card>

      <ImageModal open={open} onClose={handleClose} image={image} />
    </>
  );
};

export default ImageCard;
