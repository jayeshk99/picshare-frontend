import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IImageData } from '../../types/home';

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  image: IImageData;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, onClose, image }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        role="dialog"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '800px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          outline: 'none',
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'baseline',
            padding: '8px 16px',
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            borderRadius: '4px 4px 0 0',
          }}
        >
          <Typography variant="body1" component="div">
            {image.user.userName}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ marginLeft: '1rem' }}
          >
            {new Date(image.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <img
            src={image.imageUrl}
            alt={image.title}
            style={{
              width: '100%',
              borderRadius: '4px 4px 0 0',
              maxHeight: '600px',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageModal;
