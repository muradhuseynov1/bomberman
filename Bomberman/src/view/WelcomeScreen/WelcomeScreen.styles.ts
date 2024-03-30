import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import backgroundImage from '../../assets/mainWindowBackground.jpg';
import startButtonImage from '../../assets/startButton.png';

export const StyledBackground = styled(Box)({
  backgroundImage: `url(${backgroundImage})`,
  height: '100vh',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const InstructionsImage = styled('img')({
  width: '40%', 
  cursor: 'pointer',
  marginTop: '20px', 
  marginBottom: '20px', 
});

export const CenteredButton = styled(Button)({
  background: `url(${startButtonImage}) no-repeat center center`,
  backgroundSize: 'contain',
  width: '200px',
  height: '100px', 
  border: 'none',
  marginBottom: '50px',
  '&:hover': {
    background: `url(${startButtonImage}) no-repeat center center`,
    backgroundSize: 'contain',
  },
});