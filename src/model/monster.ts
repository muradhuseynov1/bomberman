/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import { Player } from './player';
import monsterImg from '../assets/monster.png';
import { Point } from '../constants/props';
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

  move(map: string[][], players: Player[], bombs: Map<string, number>): Monster {
    let newX = this.x;
    let newY = this.y;
    const possibleDirections: Point[] = [];
    const up: Point = { x: this.x, y: this.y - 1 };
    const right: Point = { x: this.x + 1, y: this.y };
    const down: Point = { x: this.x, y: this.y + 1 };
    const left: Point = { x: this.x - 1, y: this.y };

    [up, right, down, left].forEach((dir) => {
      if (this.isValidMove(dir.x, dir.y, map, bombs) && this.isInBounds(dir)) {
        possibleDirections.push(dir);
      }
    });

    if (possibleDirections.length > 0) {
      const index = Math.floor(Math.random() * possibleDirections.length);
      const selectedDirection = possibleDirections[index];
      newX = selectedDirection.x;
      newY = selectedDirection.y;
    }

    return new Monster(this.id, this.name, newX, newY);
  }

  protected isInBounds(point: Point): boolean {
    return point.x >= 1 && point.x < 14 && point.y >= 1 && point.y < 9;
  }

  protected isValidMove(
    x: number,
    y: number,
    map: string[][],
    bombs: Map<string, number>
  ): boolean {
    console.log(bombs);
    return (map[y][x] === ' ' && !(bombs.has(`${y}-${x}`)));
  }
}

export { Monster };
