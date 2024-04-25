import React from 'react';
import {
  CharacterContainer,
  GridCell
} from './GameScreen.styles';
import wallImage from '../../assets/wall.jpeg';
import boxImage from '../../assets/box.png';
import playerImage from '../../assets/player-image.png';
import bombImage from '../../assets/bomb.png';
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
  const isBoxCell = cellContent === 'B';
  const isBombCell = bombs.has(`${row}-${column}`);
  const player = players.find((p) => p.getX() === column && p.getY() === row);
  const monster = monsters.find((m) => m.getX() === column && m.getY() === row);
  const isEmptyCell = !isWallCell && !isBoxCell;

  return (
    <GridCell isWall={isWallCell} style={{ backgroundColor: isEmptyCell ? 'green' : 'transparent' }}>
      {isWallCell && <img src={wallImage} alt="Wall" style={{ width: '100%', height: '100%' }} />}
      {isBoxCell && <img src={boxImage} alt="Box" style={{ width: '100%', height: '100%' }} />}
      {player && (
        <CharacterContainer>
          <img src={playerImage} alt="Player" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </CharacterContainer>
      )}
      {monster && (
        <CharacterContainer>
          <img src={monster.getImg()} alt="Monster" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </CharacterContainer>
      )}
      {isBombCell && <img src={bombImage} alt="Bomb" style={{ width: '100%', height: '100%' }} />}
    </GridCell>
  );
};
