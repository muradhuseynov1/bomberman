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
  gridTemplateColumns: 'repeat(15, 1fr)',  // 15 columns
  gridAutoRows: 'auto',  // Let row height be automatic
  width: '100%',
  minHeight: '300px',  // Minimum height to ensure grid visibility
  overflow: 'auto',  // Allow scrolling within the grid if necessary
});


export const GridCell = styled.div({
  position: 'relative',
  backgroundColor: '#eee',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  ':before': {
    content: '""',
    display: 'block',
    paddingTop: '100%',
  },
});

export const StyledGameButton = styled(Button)({
  marginRight: '10px',
});

export const CharacterContainer = styled.div<CharacterContainerProps>(({ rowStart, columnStart }) => ({
  gridRowStart: rowStart,
  gridColumnStart: columnStart,
  width: '100%', // Fill the cell
  height: '100%', // Fill the cell
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

