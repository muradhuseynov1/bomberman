import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const PlayerStatusContainer = styled(Paper)(
  ({ theme, index }: { theme: Theme, index: number }) => ({
    top: `calc(${theme.spacing(2)} + ${index * 250}px)`,
    left: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  })
);

export const PlayerName = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '0.5rem',
});

export const PowerUpsList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
});

export const PowerUpItem = styled('li')({
  marginRight: '0.5rem',
  marginBottom: '0.5rem',
});

export const ObstaclesCount = styled(Typography)({
  marginTop: '1rem',
});
