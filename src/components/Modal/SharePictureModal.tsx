import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { sharePost } from '../../services/sharePost';

interface SharePictureModalProps {
  open: boolean;
  onClose: () => void;
}

const SharePictureModal: React.FC<SharePictureModalProps> = ({
  open,
  onClose,
}) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [urlError, setUrlError] = useState('');
  const [titleError, setTitleError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setUrlError('');
      setTitleError('');

      // Regex for URL validation
      const urlPattern =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d{1,5})?(\/\S*)?$/;

      const titlePattern = /^[A-Za-z]+$/;

      console.log('url test', urlPattern.test(url));
      if (!urlPattern.test(url)) {
        setUrlError('Please enter a valid URL.');
        return;
      }
      if (!titlePattern.test(title)) {
        setTitleError('Title must contain only letters without any spaces.');
        return;
      }
      if (url && title) {
        await sharePost(url, title);
        navigate('/');
        setUrl('');
        setTitle('');
        onClose();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          outline: 'none',
          borderRadius: 2,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="h2">
            Share A New Picture
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: 'black' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="New picture URL"
            variant="outlined"
            fullWidth
            error={!!urlError}
            helperText={urlError}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            error={!!titleError}
            helperText={titleError}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Share
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SharePictureModal;
