import React from 'react';
import {
  CharacterContainer,
  GridCell
} from './GameScreen.styles';
import wallImage from '../../assets/wall.jpeg';
import brickImage from '../../assets/brick.jpeg';
import playerImage from '../../assets/player-image.png';
import monsterImage from '../../assets/monster.png';
import bombImage from '../../assets/bomb.png';
import addBombImage from '../../assets/addbomb.png';
import { Player } from '../../model/player';
import { Monster } from '../../model/monster';

type GridCellComponentProps = {
  row: number;
  column: number;
  players: Player[];
  monsters: Monster[];
  map: string[][];
  bombs: Map<string, number>;
}

export const GridCellComponent = ({
  row,
  column,
  players,
  monsters,
  map,
  bombs
}: GridCellComponentProps) => {
  const cellContent = map[row][column];
  const isWallCell = cellContent === 'W';
  const isBrickCell = cellContent === 'B';
  const isPowerUpCell = cellContent === 'P';
  const isBombCell = bombs.has(`${row}-${column}`);
  const player = players.find((p) => p.getX() === column && p.getY() === row);
  const monster = monsters.find((m) => m.getX() === column && m.getY() === row);

  return (
    <GridCell isWall={isWallCell}>
      {isWallCell && <img src={wallImage} alt="Wall" style={{ width: '100%', height: '100%' }} />}
      {isBrickCell && <img src={brickImage} alt="Brick" style={{ width: '100%', height: '100%' }} />}
      {isPowerUpCell && <img src={addBombImage} alt="PowerUp" style={{ width: '100%', height: '100%' }} />}
      {player && player.isAlive() && (
        <CharacterContainer>
          <img src={playerImage} alt="Player" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </CharacterContainer>
      )}
      {monster && (
        <CharacterContainer>
          <img src={monsterImage} alt="Monster" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </CharacterContainer>
      )}
      {isBombCell && <img src={bombImage} alt="Bomb" style={{ width: '100%', height: '100%' }} />}
    </GridCell>
  );
};
