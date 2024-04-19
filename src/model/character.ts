class Character {
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

  // Basic getter and setter methods
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

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  setName(name: string): void {
    this.name = name;
  }

  // Method to move the character
  move(newX: number, newY: number): void {
    this.setX(newX);
    this.setY(newY);
  }

  // Additional methods can be added here
}

export { Character };
