/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import { Monster } from './monster';
import { Player } from './player';
import monsterImg from '../assets/ghostmonster.png';

/* eslint-disable no-plusplus */
class GhostMonster extends Monster {
  getImg(): string {
    return monsterImg;
  }

  move(bricks: Set<string>, players: Player[]): Monster {
    let newX = this.x;
    let newY = this.y;
    const possibleDirections = [];
    const up = { x: this.x, y: this.y - 1 };
    const right = { x: this.x + 1, y: this.y };
    const down = { x: this.x, y: this.y + 1 };
    const left = { x: this.x - 1, y: this.y };

    if (this.y > 2 && !(up.x === 1 || up.x === 15)) {
      possibleDirections.push(up);
    }
    if (this.x < 14 && !(right.y === 1 || right.y === 10)) {
      possibleDirections.push(right);
    }
    if (this.y < 9 && !(down.x === 1 || down.x === 15)) {
      possibleDirections.push(down);
    }
    if (this.x > 2 && !(left.y === 1 || left.y === 10)) {
      possibleDirections.push(left);
    }

    if (possibleDirections.length > 0) {
      const selectedDirection = possibleDirections[Math.floor(
        Math.random() * possibleDirections.length
      )];
      newX = selectedDirection.x;
      newY = selectedDirection.y;
    }
    return new GhostMonster(this.id, this.name, newX, newY);
  }
}

export { GhostMonster };
