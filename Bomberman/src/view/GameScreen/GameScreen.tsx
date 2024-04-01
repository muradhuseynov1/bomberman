import React from 'react';
import {
  MapContainer,
  StyledButtonContainer,
  StyledGameButton,
  Grid,
  GridCell,
  StyledGameDialog,
  CustomDialogContent,
} from './GameScreen.styles';
import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';
import PlayerStatus from './PlayerStatusScreen/PlayerStatusScreen';
import { Power } from './PlayerStatusScreen/PlayerStatusScreen';

interface GameScreenProps {
  playerName: string;
  onQuit: () => void;
  numBombs: number;
  powers: Power[];
  numObstacles: number;
}

// Assume Power type and PlayerStatusProps are defined in PlayerStatusScreen.tsx
const GameScreen: React.FC<GameScreenProps> = ({
  playerName,
  onQuit,
  numBombs = 4,
  powers = [],
  numObstacles = 4,
}) => {
  return (
    <StyledBackground>
      <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} />
      <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} />
      <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} />
      <StyledGameDialog open={true}>
        <CustomDialogContent>
          <MapContainer>
            <Grid>
              {Array.from({ length: 150 }, (_, index) => (
                <GridCell key={index} />
              ))}
            </Grid>
          </MapContainer>
          <StyledButtonContainer>
            <StyledGameButton onClick={onQuit}>Quit</StyledGameButton>
          </StyledButtonContainer>
        </CustomDialogContent>
      </StyledGameDialog>
    </StyledBackground>
  );
};

export default GameScreen;
