import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  Grid,
  GridCell,
  StyledGameDialog,
  CharacterContainer,
} from './GameScreen.styles';
import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';
import { PlayerStatus } from './PlayerStatusScreen/PlayerStatusScreen';
import { Power } from './PlayerStatusScreen/PlayerStatusScreen';
import { Paper } from '@mui/material';
import { Player } from '../../model/player';

import { generateBricks } from '../../helpers/generateBricks';

import bombermanPlayer from '../../assets/player-image.png';
import wall from '../../assets/wall.jpeg';
import brick from '../../assets/brick.jpeg';

type GameScreenProps = {
  playerName: string;
  numBombs: number;
  powers: Power[];
  numObstacles: number;
}

export const GameScreen = ({
  playerName,
  numBombs = 4,
  powers = [],
  numObstacles = 4,
}: GameScreenProps) => {
  const [player, setPlayer] = useState(new Player('player1', playerName, 2, 2));
  const [playerTwo, setPlayerTwo] = useState(new Player('player2', 'Player 2', 14, 9));
  const [bricks] = useState(() => generateBricks(10, 15));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newX1 = player.getX();
      let newY1 = player.getY();
      let newX2 = playerTwo.getX();
      let newY2 = playerTwo.getY();
  
      switch (event.key) {
        case 'w':
          newY1 = (newY1 > 2 && !bricks.has(`${newY1 - 1}-${newX1}`) && !(newY1 - 1 === newY2 && newX1 === newX2)) ? newY1 - 1 : newY1;
          break;
        case 's':
          newY1 = (newY1 < 9 && !bricks.has(`${newY1 + 1}-${newX1}`) && !(newY1 + 1 === newY2 && newX1 === newX2)) ? newY1 + 1 : newY1;
          break;
        case 'a':
          newX1 = (newX1 > 2 && !bricks.has(`${newY1}-${newX1 - 1}`) && !(newY1 === newY2 && newX1 - 1 === newX2)) ? newX1 - 1 : newX1;
          break;
        case 'd':
          newX1 = (newX1 < 14 && !bricks.has(`${newY1}-${newX1 + 1}`) && !(newY1 === newY2 && newX1 + 1 === newX2)) ? newX1 + 1 : newX1;
          break;
      }

      switch (event.key) {
        case 'ArrowUp':
          newY2 = (newY2 > 2 && !bricks.has(`${newY2 - 1}-${newX2}`) && !(newY2 - 1 === newY1 && newX2 === newX1)) ? newY2 - 1 : newY2;
          break;
        case 'ArrowDown':
          newY2 = (newY2 < 9 && !bricks.has(`${newY2 + 1}-${newX2}`) && !(newY2 + 1 === newY1 && newX2 === newX1)) ? newY2 + 1 : newY2;
          break;
        case 'ArrowLeft':
          newX2 = (newX2 > 2 && !bricks.has(`${newY2}-${newX2 - 1}`) && !(newY2 === newY1 && newX2 - 1 === newX1)) ? newX2 - 1 : newX2;
          break;
        case 'ArrowRight':
          newX2 = (newX2 < 14 && !bricks.has(`${newY2}-${newX2 + 1}`) && !(newY2 === newY1 && newX2 + 1 === newX1)) ? newX2 + 1 : newX2;
          break;
      }
  
      setPlayer(new Player(player.getId(), player.getName(), newX1, newY1));
      setPlayerTwo(new Player(playerTwo.getId(), playerTwo.getName(), newX2, newY2));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, playerTwo, bricks]);

  const renderCellsAndPlayer = () => {
    return Array.from({ length: 150 }, (_, index) => {
      const row = Math.floor(index / 15) + 1;
      const column = (index % 15) + 1;
      const isPlayerCell = player.getX() === column && player.getY() === row;
      const isPlayerTwoCell = playerTwo.getX() === column && playerTwo.getY() === row;
      const isWallCell = row === 1 || row === 10 || column === 1 || column === 15;
      const isBrickCell = bricks.has(`${row}-${column}`);
  
      return (
        <GridCell key={index} isWall={isWallCell}>
          {isWallCell && (
            <img src={wall} alt="Wall" style={{ width: '100%', height: '100%' }} />
          )}
          {isBrickCell && (
            <img src={brick} alt="Brick" style={{ width: '100%', height: '100%' }} />
          )}
          {isPlayerCell && (
            <CharacterContainer>
              <img src={bombermanPlayer} alt="Player" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </CharacterContainer>
          )}
          {isPlayerTwoCell && (
            <CharacterContainer>
              <img src={bombermanPlayer} alt="Player 2" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </CharacterContainer>
          )}
        </GridCell>
      );
    });
  };

  return (
    <StyledBackground>
      <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={1} />
      <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={2} />
      <StyledGameDialog open={true}>
        <Paper>
          <MapContainer>
            <Grid>
             {renderCellsAndPlayer()}
            </Grid>
          </MapContainer>
        </Paper>
      </StyledGameDialog>
    </StyledBackground>
  );
};
