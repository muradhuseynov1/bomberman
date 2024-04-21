/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle
import { Monster } from './monster';

const coords: number[][] = [
  [2, 2],
  [14, 9],
  [7, 7],
];

class Player {
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

  move(
    direction: string,
    bricks: Set<string>,
    bombs: Map<string, number>,
    otherPlayers: Player[],
    monsters: Monster[]
  ): Player {
    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case 'up':
        newY -= this.y > 2 && this.isValidMove(newY - 1, this.x, bricks, bombs) ? 1 : 0;
        break;
      case 'down':
        newY += this.y < 9 && this.isValidMove(newY + 1, this.x, bricks, bombs) ? 1 : 0;
        break;
      case 'left':
        newX -= this.x > 2 && this.isValidMove(this.y, newX - 1, bricks, bombs) ? 1 : 0;
        break;
      case 'right':
        newX += this.x < 14 && this.isValidMove(this.y, newX + 1, bricks, bombs) ? 1 : 0;
        break;
      default:
        break;
    }

    const collidesWithPlayer = otherPlayers.some((p) => p.getX() === newX && p.getY() === newY);
    const collidesWithMonster = monsters.some((m) => m.getX() === newX && m.getY() === newY);

    if (collidesWithMonster) {
      this.x = coords[parseInt(this.id, 10) - 1][0];
      this.y = coords[parseInt(this.id, 10) - 1][1];
      console.log(`Player ${this.id} collided with a monster!`);
      return this;
    }

    if (!collidesWithPlayer) {
      this.x = newX;
      this.y = newY;
    }

    return this;
  }

  isValidMove(y: number, x: number, bricks: Set<string>, bombs: Map<string, number>): boolean {
    return !(bricks.has(`${y}-${x}`) || bombs.has(`${y}-${x}`));
  }
}

export { Player };
