import React from 'react';
import {
  MapContainer,
  Grid,
  GridCell,
  StyledGameDialog,
} from './GameScreen.styles';
import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';
import PlayerStatus from './PlayerStatusScreen/PlayerStatusScreen';
import { Power } from './PlayerStatusScreen/PlayerStatusScreen';
import { Paper } from '@mui/material';

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
      <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={1} />
      <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={2} />
      <StyledGameDialog open={true}>
        {/* <CustomDialogContent> */}
          <Paper>
            <MapContainer>
              <Grid>
                {Array.from({ length: 150 }, (_, index) => (
                  <GridCell key={index} />
                ))}
              </Grid>
            </MapContainer>
          </Paper>
        {/* </CustomDialogContent> */}
      </StyledGameDialog>
    </StyledBackground>
  );
};

export default GameScreen;
