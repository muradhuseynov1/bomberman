import styled from '@emotion/styled';
import { Button, DialogContent } from '@mui/material';
import { Dialog } from '@mui/material';

export const PlayerStatusContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 16px;
  border-radius: 10px;
  background-color: white;
`;

export const PlayerStatusContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlayerName = styled('h2')`
  margin-bottom: 0.5rem;
`;

export const PowerUpsList = styled('ul')`
  list-style-type: none;
  padding-left: 0;
`;

export const PowerUpItem = styled('li')`
  display: inline-block;
  margin-right: 0.5rem;
`;

export const ObstaclesCount = styled('p')`
  margin-top: 1rem;
`;

export const CustomDialogContent = styled(DialogContent)`
  && {
    width: 100%;
    max-width: none;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledGameDialog = styled(Dialog)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 800px;
    height: 600px;
    padding: 20px;
    background-color: #fff;
  }
`;

export const MapContainer = styled.div`
  width: 80%;
  height: 60vh;
  border: 2px solid #ccc;
  margin-bottom: 20px;
  overflow: auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
`;

export const GridCell = styled.div`
  width: 100%;
  height: 40px;
  background-color: #eee;
  border: 1px solid #ccc;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const StyledGameButton = styled(Button)`
  && {
    margin-right: 10px;
  }
`;
