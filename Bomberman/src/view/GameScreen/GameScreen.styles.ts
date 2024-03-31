import styled from '@emotion/styled';

export const StyledGameDialog = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  margin: auto; /* Center vertically and horizontally */
  width: 800px;
  height: 600px;
  padding: 20px;
  background-color: #fff;
`;

export const MapContainer = styled.div`
  width: 95%; 
  height: 90%; /* Change from 80% to 90% */
  border: 2px solid #ccc;
  margin-right: 20px;
  position: relative;
`;

export const PlayerStatusPanel = styled.div`
  height: calc(50% - 40px);
  max-height: 10%; 
  border: 2px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PlayerStatus = styled.div`
  margin-bottom: 10px;
`;

export const StyledButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const StyledGameButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 2px;
  background-color: #eee;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const GridCell = styled.div`
  background-color: #ccc;
  border: 1px solid #999;
`;
