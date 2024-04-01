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

export const StyledGameDialog = styled(Dialog)({
  '& .MuiDialog-container .MuiPaper-root': {
    width: '80%',
    height: '80%',
    maxWidth: 'none',
    maxHeight: 'none',
  },
});

export const MapContainer = styled.div({
  flexGrow: 1,
  width: '100%',
  height: '100%',
  border: '2px solid #ccc',
  overflow: 'auto',
});

export const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(10, 1fr)',
  gap: '2px',
});

export const GridCell = styled.div({
  width: '100%',
  height: '40px',
  backgroundColor: '#eee',
  border: '1px solid #ccc',
});

export const StyledButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

export const StyledGameButton = styled(Button)({
  marginRight: '10px',
});
