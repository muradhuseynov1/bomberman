import React, { useState, useEffect, useCallback } from 'react';
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
import monster from '../../assets/monster.png';

type GameScreenProps = {
  playerName: string;
  numBombs: number;
  powers: Power[];
  numObstacles: number;
}

interface KeyBindings {
  [playerNumber: string]: string[];
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
  const [monsters, setMonsters] = useState([
    new Player('monster1', 'Monster 1', 5, 5),
    new Player('monster2', 'Monster 2', 10, 7),
  ]);
  const [keyBindings, setKeyBindings] = useState<KeyBindings>({});

  useEffect(() => {
    const storedBindings = localStorage.getItem('playerKeyBindings');
    if (storedBindings) {
      const parsedBindings = JSON.parse(storedBindings);
      setKeyBindings(parsedBindings);
      console.log('Key Bindings Loaded:', parsedBindings);
    }
  }, []);

  // TODO: monster should not be a Player object, but a Monster object.
  // TODO: Later change the Player object to a Monster object.
  const moveMonster = useCallback((monster: Player) => {
    let newX = monster.getX();
    let newY = monster.getY();
    let possibleDirections = [1, 2, 3, 4]; // 1: up, 2: right, 3: down, 4: left
  
    possibleDirections = possibleDirections.filter(direction => {
      switch (direction) {
        case 1:
          return newY > 2 && !bricks.has(`${newY - 1}-${newX}`) && !(newX === 1 || newX === 15);
        case 2:
          return newX < 14 && !bricks.has(`${newY}-${newX + 1}`) && !(newY === 1 || newY === 10);
        case 3:
          return newY < 9 && !bricks.has(`${newY + 1}-${newX}`) && !(newX === 1 || newX === 15);
        case 4:
          return newX > 2 && !bricks.has(`${newY}-${newX - 1}`) && !(newY === 1 || newY === 10);
        default:
          return false;
      }
    });
  
    if (possibleDirections.length > 0) {
      const direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
  
      switch (direction) {
        case 1: newY--; break;
        case 2: newX++; break;
        case 3: newY++; break;
        case 4: newX--; break;
      }
    }
  
    if ((newX === 2 && newY === 2) || (newX === 14 && newY === 9)) {
      return monster;
    }
  
    return new Player(monster.getId(), monster.getName(), newX, newY);
  }, [bricks]);
  

  const checkPlayerCollision = useCallback((currentPlayer: Player, currentPlayerTwo: Player, currentMonsters: Player[]) => {
    currentMonsters.forEach(monster => {
      if (monster.getX() === currentPlayer.getX() && monster.getY() === currentPlayer.getY()) {
        setPlayer(prev => new Player(prev.getId(), prev.getName(), 2, 2));
      }
      if (monster.getX() === currentPlayerTwo.getX() && monster.getY() === currentPlayerTwo.getY()) {
        setPlayerTwo(prev => new Player(prev.getId(), prev.getName(), 14, 9));
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMonsters(currentMonsters => currentMonsters.map(monster => moveMonster(monster) || monster));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [moveMonster]);

  useEffect(() => {
    checkPlayerCollision(player, playerTwo, monsters);
  }, [player, playerTwo, monsters, checkPlayerCollision]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newX1 = player.getX();
      let newY1 = player.getY();
      let newX2 = playerTwo.getX();
      let newY2 = playerTwo.getY();

      const playerOneBindings = keyBindings['1'] || [];
      const playerTwoBindings = keyBindings['2'] || [];

      if (playerOneBindings.includes(event.key)) {
        switch (event.key) {
          case playerOneBindings[0]: // Up
            newY1 = (newY1 > 2 && !bricks.has(`${newY1 - 1}-${newX1}`) && !(newY1 - 1 === newY2 && newX1 === newX2)) ? newY1 - 1 : newY1;
            break;
          case playerOneBindings[1]: // Left
            newX1 = (newX1 > 2 && !bricks.has(`${newY1}-${newX1 - 1}`) && !(newY1 === newY2 && newX1 - 1 === newX2)) ? newX1 - 1 : newX1;
            break;
          case playerOneBindings[2]: // Down
            newY1 = (newY1 < 9 && !bricks.has(`${newY1 + 1}-${newX1}`) && !(newY1 + 1 === newY2 && newX1 === newX2)) ? newY1 + 1 : newY1;
            break;
          case playerOneBindings[3]: // Right
            newX1 = (newX1 < 14 && !bricks.has(`${newY1}-${newX1 + 1}`) && !(newY1 === newY2 && newX1 + 1 === newX2)) ? newX1 + 1 : newX1;
            break;
        }
      }

      if (playerTwoBindings.includes(event.key)) {
        switch (event.key) {
          case playerTwoBindings[0]:
            newY2 = (newY2 > 2 && !bricks.has(`${newY2 - 1}-${newX2}`) && !(newY2 - 1 === newY1 && newX2 === newX1)) ? newY2 - 1 : newY2;
            break;
          case playerTwoBindings[1]:
            newX2 = (newX2 > 2 && !bricks.has(`${newY2}-${newX2 - 1}`) && !(newY2 === newY1 && newX2 - 1 === newX1)) ? newX2 - 1 : newX2;
            break;
          case playerTwoBindings[2]:
            newY2 = (newY2 < 9 && !bricks.has(`${newY2 + 1}-${newX2}`) && !(newY2 + 1 === newY1 && newX2 === newX1)) ? newY2 + 1 : newY2;
            break;
          case playerTwoBindings[3]:
            newX2 = (newX2 < 14 && !bricks.has(`${newY2}-${newX2 + 1}`) && !(newY2 === newY1 && newX2 + 1 === newX1)) ? newX2 + 1 : newX2;
            break;
        }
      }
      if (newX1 !== player.getX() || newY1 !== player.getY()) {
        setPlayer(new Player(player.getId(), player.getName(), newX1, newY1));
      }
      if (newX2 !== playerTwo.getX() || newY2 !== playerTwo.getY()) {
        setPlayerTwo(new Player(playerTwo.getId(), playerTwo.getName(), newX2, newY2));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, playerTwo, keyBindings, bricks]);

  const renderCellsAndPlayer = () => {
    return Array.from({ length: 150 }, (_, index) => {
      const row = Math.floor(index / 15) + 1;
      const column = (index % 15) + 1;
      const isPlayerCell = player.getX() === column && player.getY() === row;
      const isPlayerTwoCell = playerTwo.getX() === column && playerTwo.getY() === row;
      const isMonsterCell = monsters.some(monster => monster.getX() === column && monster.getY() === row);
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
          {isMonsterCell && (
          <CharacterContainer>
            <img src={monster} alt="Monster" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
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
