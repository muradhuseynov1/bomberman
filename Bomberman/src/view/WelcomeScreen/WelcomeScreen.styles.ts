import styled from '@emotion/styled';
import { Box, Accordion, Button } from '@mui/material';
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

export const StyledAccordion = styled(Accordion)({
  boxShadow: 'none',
  width: '40%',
  backgroundColor: 'transparent',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  },
  '& .MuiAccordionSummary-root': {
    minHeight: 0,
    '&.Mui-expanded': {
      minHeight: 0,
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    '&.Mui-expanded': {
      margin: 0,
    },
  },
  '& .MuiAccordionDetails-root': {
    padding: 0,
  },
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
