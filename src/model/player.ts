/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle

class Player {
  private id: string;

  private name: string;

  private x: number;

  private y: number;

  private active: boolean = true;

  constructor(id: string, name: string, x: number = 0, y: number = 0, active: boolean = true) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.active = active;
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

  deactivate() {
    this.active = false;
  }

  isActive(): boolean {
    return this.active;
  }

  move(
    direction: string,
    map: string[][],
    bombs: Map<string, number>,
    otherPlayers: Player[]
  ): Player {
    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case 'up':
        newY -= this.y > 0 && this.isValidMove(newY - 1, this.x, map, bombs) ? 1 : 0;
        break;
      case 'down':
        newY += this.y < map.length - 1 && this.isValidMove(newY + 1, this.x, map, bombs) ? 1 : 0;
        break;
      case 'left':
        newX -= this.x > 0 && this.isValidMove(this.y, newX - 1, map, bombs) ? 1 : 0;
        break;
      case 'right':
        newX += (
          this.x < map[0].length - 1 && this.isValidMove(this.y, newX + 1, map, bombs)
        ) ? 1 : 0;
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

  // eslint-disable-next-line no-unused-vars
  isValidMove(y: number, x: number, map: string[][], bombs: Map<string, number>): boolean {
    return (map[y][x] === ' ' && !(bombs.has(`${y}-${x}`)));
  }
}

export { Player };
