import styled from '@emotion/styled';
import { Button, Dialog, DialogContent } from '@mui/material';

type GridCellProps = {
  isWall: boolean;
};

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
    width: '100%',
    height: 'auto',
    maxWidth: '800px',
    maxHeight: '95vh',
    overflow: 'auto',
  },
}));

export const MapContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 'auto',
  overflow: 'hidden'
});

export const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(15, 1fr)',
  gridAutoRows: '1fr',
  width: '100%',
  minHeight: '300px',
  overflow: 'hidden',
});

export const GridCell = styled.div<GridCellProps>(({ isWall }) => ({
  position: 'relative',
  backgroundColor: isWall ? 'transparent' : '#eee',
  border: '1px solid #ccc',
  aspectRatio: '1',
  overflow: 'hidden',
}));

export const StyledGameButton = styled(Button)({
  marginRight: '10px',
});

export const CharacterContainer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
