/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import { Monster } from './monster';
import { Player } from './player';
import monsterImg from '../assets/prosmartmonster.jpg';

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
    const possibleDirections = [];

    const up = { x: this.x, y: this.y - 1 };
    const right = { x: this.x + 1, y: this.y };
    const down = { x: this.x, y: this.y + 1 };
    const left = { x: this.x - 1, y: this.y };

    if (this.y > 2 && !bricks.has(`${up.y}-${up.x}`) && !(up.x === 1 || up.x === 15)) {
      possibleDirections.push(up);
    }
    if (this.x < 14 && !bricks.has(`${right.y}-${right.x}`) && !(right.y === 1 || right.y === 10)) {
      possibleDirections.push(right);
    }
    if (this.y < 9 && !bricks.has(`${down.y}-${down.x}`) && !(down.x === 1 || down.x === 15)) {
      possibleDirections.push(down);
    }
    if (this.x > 2 && !bricks.has(`${left.y}-${left.x}`) && !(left.y === 1 || left.y === 10)) {
      possibleDirections.push(left);
    }

    if (possibleDirections.length > 0) {
      const chosenDirection = this.chooseDirection(possibleDirections, players);
      newX = chosenDirection.x;
      newY = chosenDirection.y;
    }

    this.x = newX;
    this.y = newY;
    return this;
  }

  chooseDirection(
    possibleDirections: {y: number, x: number}[],
    players: Player[]
  ): {y: number, x: number} {
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
    directions: {y: number, x: number}[]
  ): {y: number, x: number} {
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
}

export { ForkMonster };
