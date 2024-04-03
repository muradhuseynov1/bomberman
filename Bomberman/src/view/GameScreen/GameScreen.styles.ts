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
    width: '100%',  // Use 100% for full width but ensure it doesn't exceed the viewport width
    height: 'auto',  // Let the height be automatic to adjust based on content
    maxWidth: '800px',  // Increased max width for larger screens
    maxHeight: '95vh',  // Increased max height to make use of more viewport height
    overflow: 'auto',  // Allow scrolling inside the dialog if content overflows
  },
}));

export const MapContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',  // Full width of the Paper component
  height: 'auto',  // Auto height to wrap the content
  overflow: 'hidden',  // Hide the overflow
});

export const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(15, 1fr)',  // 15 columns
  gridAutoRows: 'auto',  // Let row height be automatic
  width: '100%',
  minHeight: '300px',  // Minimum height to ensure grid visibility
  overflow: 'auto',  // Allow scrolling within the grid if necessary
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

export const StyledGameButton = styled(Button)({
  marginRight: '10px',
});
