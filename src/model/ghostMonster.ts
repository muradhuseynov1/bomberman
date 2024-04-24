/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import { Monster } from './monster';
import { Player } from './player';
import monsterImg from '../assets/ghostmonster.png';
import { Point } from '../constants/props';

/* eslint-disable no-plusplus */
class GhostMonster extends Monster {
  getImg(): string {
    return monsterImg;
  }

  move(map: string[][], players: Player[], bombs: Map<string, number>): Monster {
    let newX = this.x;
    let newY = this.y;
    const possibleDirections: Point[] = [];
    const up = { x: this.x, y: this.y - 1 };
    const right = { x: this.x + 1, y: this.y };
    const down = { x: this.x, y: this.y + 1 };
    const left = { x: this.x - 1, y: this.y };

    [up, right, down, left].forEach((dir) => {
      if (this.isValidMove(dir.x, dir.y, map, bombs) && this.isInBounds(dir)) {
        possibleDirections.push(dir);
      }
    });

    if (possibleDirections.length > 0) {
      const selectedDirection = possibleDirections[Math.floor(
        Math.random() * possibleDirections.length
      )];
      newX = selectedDirection.x;
      newY = selectedDirection.y;
    }
    return new GhostMonster(this.id, this.name, newX, newY);
  }

  protected isValidMove(
    y: number,
    x: number,
    map: string[][],
    bombs: Map<string, number>
  ): boolean {
    return (!(bombs.has(`${y}-${x}`)));
  }
}

export { GhostMonster };
