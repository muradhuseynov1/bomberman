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
import { Player } from '../../model/player';
import { Monster } from '../../model/monster';

type GridCellComponentProps = {
  index: number;
  row: number;
  column: number;
  players: Player[];
  monsters: Monster[];
  bricks: Set<string>;
  bombs: Map<string, number>;
}

export const GridCellComponent = ({
  index,
  row,
  column,
  players,
  monsters,
  bricks,
  bombs
}: GridCellComponentProps) => {
  const isWallCell = row === 1 || row === 10 || column === 1 || column === 15;
  const isBrickCell = bricks.has(`${row}-${column}`);
  const isBombCell = bombs.has(`${row}-${column}`);
  const player = players.find((p) => p.getX() === column && p.getY() === row);
  const monster = monsters.find((m) => m.getX() === column && m.getY() === row);

  return (
    <GridCell key={index} isWall={isWallCell}>
      {isWallCell && <img src={wallImage} alt="Wall" style={{ width: '100%', height: '100%' }} />}
      {isBrickCell && <img src={brickImage} alt="Brick" style={{ width: '100%', height: '100%' }} />}
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
