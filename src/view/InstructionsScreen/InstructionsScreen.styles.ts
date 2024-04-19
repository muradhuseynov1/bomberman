import styled from '@emotion/styled';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions as MuiDialogActions
} from '@mui/material';
import backgroundImage from '../../assets/mainWindowBackground.jpg';
import backButtonImage from '../../assets/back_button.png';

export const InstructionsBackground = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
});

export const StyledDialog = styled(Dialog)({
  '& .MuiDialog-container': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .MuiPaper-root': {
    backgroundColor: '#f0f0f0',
    border: '3px solid #d32f2f',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
  },
});

export const StyledDialogTitle = styled(DialogTitle)({
  textAlign: 'center',
  color: '#d32f2f',
});

export const StyledDialogContent = styled(DialogContent)({
  padding: '20px',
  maxHeight: '80vh',
  overflowY: 'auto',
});

export const DialogActions = styled(MuiDialogActions)({
  justifyContent: 'center',
  padding: '8px',
  minHeight: '60px',
  display: 'flex',
  alignItems: 'center',
});

export const BackButton = styled('button')({
  background: `url(${backButtonImage}) no-repeat center center`,
  backgroundSize: 'cover',
  width: '140px',
  height: '60px',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
});
