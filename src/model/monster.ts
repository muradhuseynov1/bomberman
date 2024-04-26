/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import { GameMap } from './gameItem';

/* eslint-disable no-plusplus */
class Monster {
  private id: string;

  private name: string;

  private x: number;

  private y: number;

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

  move(map: GameMap): Monster {
    let newX = this.x;
    let newY = this.y;
    const possibleDirections = [];

    // Directions checking considering the boundaries and
    // non-walkable cells ('W' for walls, 'B' for bricks)
    if (this.y > 0 && map[this.y - 1][this.x] === 'Empty') { // Up
      possibleDirections.push({ x: this.x, y: this.y - 1 });
    }
    if (this.x < map[0].length - 1 && map[this.y][this.x + 1] === 'Empty') { // Right
      possibleDirections.push({ x: this.x + 1, y: this.y });
    }
    if (this.y < map.length - 1 && map[this.y + 1][this.x] === 'Empty') { // Down
      possibleDirections.push({ x: this.x, y: this.y + 1 });
    }
    if (this.x > 0 && map[this.y][this.x - 1] === 'Empty') { // Left
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
