import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loginBox: {
    width: '320px',
    padding: '40px 20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    fontWeight: 700,
    fontSize: '24px',
  },
  subtitle: {
    marginBottom: '20px',
    color: '#757575',
  },
  textField: {
    marginBottom: '20px',
    width: '100%',
  },
  loginButton: {
    width: '150px',
    marginTop: '20px',
  },
});

const Login: React.FC = () => {
  const classes = useStyles();

  const handleLogin = () => {
    // Handle the login logic
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.loginBox}>
        <Typography
          style={{ marginBottom: 10 }}
          variant="h4"
          className={classes.title}
        >
          PicShare
        </Typography>
        <Typography
          marginBottom={'20px'}
          variant="body1"
          className={classes.subtitle}
        >
          Login to start sharing
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Username"
          className={classes.textField}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.loginButton}
          onClick={handleLogin}
          style={{ marginTop: 20 }}
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
