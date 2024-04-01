import { styled } from '@mui/system';
import { Paper } from '@mui/material';

export const PlayerStatusContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const PlayerName = styled('h2')({
  marginBottom: '0.5rem',
});

export const PowerUpsList = styled('ul')({
  listStyleType: 'none',
  paddingLeft: 0,
});

export const PowerUpItem = styled('li')({
  display: 'inline-block',
  marginRight: '0.5rem',
});

export const ObstaclesCount = styled('p')({
  marginTop: '1rem',
});
