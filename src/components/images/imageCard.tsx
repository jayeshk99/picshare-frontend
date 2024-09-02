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
import { IImageData } from '../../types/home'; // Adjust the import path as necessary
import ImageModal from '../Modal/ImageModal';
// Adjust the import path as necessary

interface ImageCardProps {
  image: IImageData;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  console.log('image:', image);
  const [open, setOpen] = useState(false);

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
            <IconButton
              aria-label="add to favorites"
              // sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Use the ImageModal component */}
      <ImageModal open={open} onClose={handleClose} image={image} />
    </>
  );
};

export default ImageCard;
