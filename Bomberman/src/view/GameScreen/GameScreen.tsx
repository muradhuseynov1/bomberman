// GameScreen.tsx
import React from 'react';
import {
  DialogContent,
} from '@mui/material';
import {
  MapContainer,
  StyledButtonContainer,
  StyledGameButton,
  Grid,
  GridCell,
  StyledGameDialog
} from './GameScreen.styles';

import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';
import PlayerStatus from './PlayerStatusScreen/PlayerStatusScreen';

interface GameScreenProps {
  // Define any props needed for the GameScreen component
}

const GameScreen: React.FC<GameScreenProps> = ({}) => {
  // Define any necessary state or logic for the GameScreen component

  const handleQuit = () => {
    // Handle quitting the game
  };

  const updatePlayerStatus = (player_name: string) => {

  }
  return (
    <StyledBackground>
      <StyledGameDialog open={true}>
        <DialogContent>
          <PlayerStatus playerName="" numBombs={4} powers={[]} numObstacles={4} />
          <MapContainer>
            <Grid>
              {Array.from({ length: 150 }, (_, index) => (
                <GridCell key={index} />
              ))}
            </Grid>
            {/* Render the game map here */}
          </MapContainer>
          <StyledButtonContainer>
            <StyledGameButton onClick={handleQuit}>Quit</StyledGameButton>
            {/* Add more game control buttons as needed */}
          </StyledButtonContainer>
        </DialogContent>
      </StyledGameDialog>
    </StyledBackground>
  );
};

export default GameScreen;
