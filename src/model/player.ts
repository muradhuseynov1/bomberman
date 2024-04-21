/* eslint-disable class-methods-use-this */

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
}

export { Player };
