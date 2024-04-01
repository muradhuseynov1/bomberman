import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Dialog } from '@mui/material';
export const StyledGameDialog = styled(Dialog)`
  && {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    margin: auto; /* Center vertically and horizontally */
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
  grid-template-columns: repeat(10, 1fr); /* Adjust the number of columns as needed */
  gap: 2px; /* Adjust gap between grid cells as needed */
`;

export const GridCell = styled.div`
  width: 100%;
  height: 40px; /* Adjust height of grid cells as needed */
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
