/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle

import { Power } from "../constants/props";

class Player {
  private id: string;

  private name: string;

  private x: number;

  private y: number;

  private isActive: boolean;// New attribute to track if the player is still active

  private bombs: number;

  private bombRange: number;

  private powerUps: Power[];

  private obstacles: number;



  constructor(id: string, name: string, x: number, y: number, isActive: boolean = true, bombs: number = 4, bombRange: number = 2, powerUps: Power[] = [], obstacles: number = 0) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.isActive = isActive;
    this.bombs = bombs;
    this.bombRange = bombRange;
    this.powerUps = powerUps;
    this.obstacles = obstacles;
  }

  static fromPlayer(player: Player): Player {
    return new Player(
      player.id,
      player.name,
      player.x,
      player.y,
      player.isActive,
      player.bombs,
      player.bombRange,
      player.powerUps,
      player.obstacles
    );
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
    otherPlayers: Player[]
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

    if (!collidesWithPlayer) {
      this.x = newX;
      this.y = newY;
    }

    return this;
  }

  isValidMove(y: number, x: number, bricks: Set<string>, bombs: Map<string, number>): boolean {
    return !(bricks.has(`${y}-${x}`) || bombs.has(`${y}-${x}`));
  }

  killPlayer(): void {
    console.log(`${this.name} has been killed.`);
    this.isActive = false;
  }

  resetPosition(startX: number, startY: number): void {
    this.x = startX;
    this.y = startY;
    this.isActive = true;
  }

  isAlive(): boolean {
    return this.isActive;
  }
}

export { Player };
