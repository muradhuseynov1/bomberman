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
}

export { Player };
