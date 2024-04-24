/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import { Player } from './player';
import monsterImg from '../assets/monster.png';
/* eslint-disable no-plusplus */
class Monster {
  protected id: string;

  protected name: string;

  protected x: number;

  protected y: number;

  constructor(id: string, name: string, x: number = 0, y: number = 0) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getImg(): string {
    return monsterImg;
  }

  move(map: string[][], players: Player[]): Monster {
    let newX = this.x;
    let newY = this.y;
    const possibleDirections = [];

    // Directions checking considering the boundaries and
    // non-walkable cells ('W' for walls, 'B' for bricks)
    if (this.y > 0 && map[this.y - 1][this.x] === ' ') { // Up
      possibleDirections.push({ x: this.x, y: this.y - 1 });
    }
    if (this.x < map[0].length - 1 && map[this.y][this.x + 1] === ' ') { // Right
      possibleDirections.push({ x: this.x + 1, y: this.y });
    }
    if (this.y < map.length - 1 && map[this.y + 1][this.x] === ' ') { // Down
      possibleDirections.push({ x: this.x, y: this.y + 1 });
    }
    if (this.x > 0 && map[this.y][this.x - 1] === ' ') { // Left
      possibleDirections.push({ x: this.x - 1, y: this.y });
    }

    if (possibleDirections.length > 0) {
      const index = Math.floor(Math.random() * possibleDirections.length);
      const selectedDirection = possibleDirections[index];
      newX = selectedDirection.x;
      newY = selectedDirection.y;
    }

    return new Monster(this.id, this.name, newX, newY);
  }
}

export { Monster };
