class Player {
  private id: string;
  private name: string;
  private numBombs: number;
  // Add other properties as needed

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.numBombs = 4;
    // Initialize other properties
  }

  // Getter methods
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getNumBombs(): number {
    return this.numBombs;
  }

  // Setter methods
  setName(name: string): void {
    this.name = name;
  }

  setNumBombs(numBombs: number): void {
    this.numBombs = numBombs;
  }

  // Add other methods as needed
}

export { Player };
