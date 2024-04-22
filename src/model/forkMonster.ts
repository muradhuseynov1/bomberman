/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import { Monster } from './monster';
import { Player } from './player';
import monsterImg from '../assets/prosmartmonster.jpg';
import { Point } from '../constants/props';

class ForkMonster extends Monster {
  constructor(id: string, name: string, x: number = 0, y: number = 0) {
    super(id, name, x, y);
  }

  getImg(): string {
    return monsterImg;
  }

  move(bricks: Set<string>, players: Player[]): ForkMonster {
    let newX = this.x;
    let newY = this.y;
    const possibleDirections: Point[] = [];

    const up: Point = { x: this.x, y: this.y - 1 };
    const right: Point = { x: this.x + 1, y: this.y };
    const down: Point = { x: this.x, y: this.y + 1 };
    const left: Point = { x: this.x - 1, y: this.y };

    [up, right, down, left].forEach((dir) => {
      if (!bricks.has(`${dir.y}-${dir.x}`) && this.isInBounds(dir)) {
        possibleDirections.push(dir);
      }
    });

    if (possibleDirections.length > 0) {
      const chosenDirection = this.chooseDirection(possibleDirections, players);
      newX = chosenDirection.x;
      newY = chosenDirection.y;
    }
    return new ForkMonster(this.id, this.name, newX, newY);
  }

  chooseDirection(
    possibleDirections: Point[],
    players: Player[]
  ): Point {
    const closestPlayer = this.findClosestPlayer(players);
    if (!closestPlayer) {
      return possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
    }

    const bestDirection = this.pathfindToPlayer(closestPlayer, possibleDirections);
    if (Math.random() < 0.15) {
      return possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
    }

    return bestDirection;
  }

  findClosestPlayer(players: Player[]): Player | null {
    let minDistance = Infinity;
    let closestPlayer: Player | null = null;

    for (const player of players) {
      const distance = Math.abs(this.x - player.getX()) + Math.abs(this.y - player.getY());
      if (distance < minDistance) {
        minDistance = distance;
        closestPlayer = player;
      }
    }

    return closestPlayer;
  }

  pathfindToPlayer(
    player: Player,
    directions: Point[]
  ): Point {
    let bestDirection = directions[0];
    let minDistance = Infinity;

    for (const direction of directions) {
      const distance = Math.abs(direction.x - player.getX())
       + Math.abs(direction.y - player.getY());
      if (distance < minDistance) {
        minDistance = distance;
        bestDirection = direction;
      }
    }

    return bestDirection;
  }

  private isInBounds(point: Point): boolean {
    return point.x >= 2 && point.x < 16 && point.y >= 2 && point.y < 11;
  }
}

export { ForkMonster };
