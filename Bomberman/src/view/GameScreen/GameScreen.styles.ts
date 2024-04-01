import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  grid-template-columns: repeat(10, 1fr); // Adjust the number of columns as needed
  gap: 2px; // Adjust gap between grid cells as needed
`;

export const GridCell = styled.div`
  width: 100%;
  height: 40px; // Adjust height of grid cells as needed
  background-color: #eee;
  border: 1px solid #ccc;
`;

export const PlayerStatusPanel = styled.div`
  width: 80%;
  background-color: #f0f0f0;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
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