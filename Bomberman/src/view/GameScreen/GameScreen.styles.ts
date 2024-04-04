import styled from '@emotion/styled';
import { Button, Dialog, DialogContent } from '@mui/material';

interface CharacterContainerProps {
  rowStart: number;
  columnStart: number;
}


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
  gridTemplateColumns: 'repeat(15, 1fr)',
  gridAutoRows: '1fr',
  width: '100%',
  minHeight: '300px',
  overflow: 'hidden',
});


export const GridCell = styled.div({
  position: 'relative', // Allows it to be a reference point for absolute positioning
  backgroundColor: '#eee',
  border: '1px solid #ccc',
  aspectRatio: '1', // Ensure square cells
});

export const StyledGameButton = styled(Button)({
  marginRight: '10px',
});

export const CharacterContainer = styled.div({
  position: 'absolute', // Positioned absolutely within its parent GridCell
  top: 0,
  left: 0,
  width: '100%', // Fill the cell
  height: '100%', // Fill the cell
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

