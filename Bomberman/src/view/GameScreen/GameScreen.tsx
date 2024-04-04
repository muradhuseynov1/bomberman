import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  MapContainer,
  MyGrid,
  GridCell,
  StyledGameDialog,
  CharacterContainer, // You'll need to define this for positioning characters
} from './GameScreen.styles';
import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';
import PlayerStatus from './PlayerStatusScreen/PlayerStatusScreen';
import { Power } from './PlayerStatusScreen/PlayerStatusScreen';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Player } from '../../model/player';


import bombermanPlayer from '../../assets/player-image.png';

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
  console.log(`Initial States - playerName: ${playerName}, numBombs: ${numBombs}, numObstacles: ${numObstacles}`); // Add this line
  // Initialize the player with a starting position
  const [player, setPlayer] = useState(new Player('player1', playerName, 1, 1));
  const { numOfPlayers } = useParams();
  // Handle player movement (this is just a placeholder - you'll need to implement real movement logic)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newX = player.getX();
      let newY = player.getY();

      switch (event.key) {
        case 'ArrowUp':
          newY -= 1;
          break;
        case 'ArrowDown':
          newY += 1;
          break;
        case 'ArrowLeft':
          newX -= 1;
          break;
        case 'ArrowRight':
          newX += 1;
          break;
        default:
          return;
      }

      setPlayer(new Player(player.getId(), player.getName(), newX, newY));
      console.log(`New Player Position: ${newX}, ${newY}`);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [player]);

  // Function to render the player on the grid


  // Example conceptual change
const renderCells = () => {
  return Array.from({ length: 150 }, (_, index) => {
    const row = Math.floor(index / 15) + 1; // Calculate row based on index
    const column = (index % 15) + 1; // Calculate column based on index

    return (
      <GridCell key={index}>
        {player.getX() === column && player.getY() === row && (
          <CharacterContainer>
            <img src={bombermanPlayer} alt="Player" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </CharacterContainer>
        )}
      </GridCell>
    );
  });
};

// Instead of rendering cells and the player separately, integrate into one unified rendering logic
const renderCellsAndPlayer = () => {
  return Array.from({ length: 150 }, (_, index) => {
    const row = Math.floor(index / 15) + 1; // Calculate row based on index
    const column = (index % 15) + 1; // Calculate column based on index

    const isPlayerCell = player.getX() === column && player.getY() === row;

    return (
      <GridCell key={index}>
        {isPlayerCell && (
          <CharacterContainer>
            <img src={bombermanPlayer} alt="Player" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </CharacterContainer>
        )}
      </GridCell>
    );
  });
};



return (
  <StyledBackground>
    <StyledGameDialog open={true}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={1} />
          <br/>
          <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={1} />
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <MapContainer>
              <MyGrid>
                {renderCellsAndPlayer()}
              </MyGrid>
            </MapContainer>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          {numOfPlayers == '3' && <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={3} />}
        </Grid>
      </Grid>
    </StyledGameDialog>
  </StyledBackground>
);

};

export default GameScreen;
