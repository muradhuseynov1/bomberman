/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
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

  move(bricks: Set<string>): Monster {
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
      const selectedDirection = possibleDirections[Math.floor(
        Math.random() * possibleDirections.length
      )];
      newX = selectedDirection.x;
      newY = selectedDirection.y;
    }
    return new Monster(this.id, this.name, newX, newY);
  }
}

export { Monster };
