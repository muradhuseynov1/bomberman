// GameScreen.tsx
import React from 'react';
import {
  MapContainer,
  StyledButtonContainer,
  StyledGameButton,
  Grid,
  GridCell,
  StyledGameDialog,
  CustomDialogContent,
  PlayerStatusContainer,
  PlayerStatusContent
} from './GameScreen.styles';
import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';
import PlayerStatus from './PlayerStatusScreen/PlayerStatusScreen';

export type Power = 'Detonator' | 'RollerSkate' | 'Invincibility' | 'Ghost' | 'Obstacle';

interface GameScreenProps {
  playerName: string;
  onQuit: () => void;
  numBombs: number;
  powers: Power[];
  numObstacles: number;
}

const GameScreen: React.FC<GameScreenProps> = ({
  playerName,
  onQuit,
  numBombs = 4,
  powers = [],
  numObstacles = 4,
}) => {
  return (
    <StyledBackground>
      <PlayerStatusContainer>
        <PlayerStatusContent>
          <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} />
        </PlayerStatusContent>
      </PlayerStatusContainer>
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
