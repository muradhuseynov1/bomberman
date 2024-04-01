import styled from '@emotion/styled';
import { Button, Dialog, DialogContent } from '@mui/material';

export const CustomDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: 'none',
  height: 'auto',
});

export const StyledGameDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '75%',
    height: '80vh', // Or 'auto' if it needs to adjust to the content size
    maxHeight: 'none',
    maxWidth: 'none',
    overflow: 'hidden', // Hide the overflow
    // More styles as needed
  },
}));

export const MapContainer = styled.div({
  display: 'flex', // Using flex to fill the container
  justifyContent: 'center', // Centering the grid
  alignItems: 'center', // Centering the grid
  width: '100%', // Full width of the dialog content
  height: 'calc(100% - 40px)', // Adjust the 40px to account for any margins or padding you might have
  overflow: 'hidden', // Hiding the overflow
});

export const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(15, 1fr)', // Assuming you want 15 columns, adjust as needed
  gridAutoRows: '1fr', // Each row takes up an equal fraction of the available space
  width: '100%',
  height: '100%', // Full height of the MapContainer
});

export const GridCell = styled.div({
  backgroundColor: '#eee',
  border: '1px solid #ccc',
  boxSizing: 'border-box', // Ensures padding and borders are included in the width/height
  ':before': { // Use a pseudo-element to maintain the aspect ratio
    content: '""',
    display: 'block',
    paddingTop: '100%', // This creates a square aspect ratio (height equals width)
  },
});

export const StyledButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

export const StyledGameButton = styled(Button)({
  marginRight: '10px',
});
