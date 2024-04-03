import { Character } from "./charcter";

class Player extends Character {
  private numBombs: number;

  constructor(id: string, name: string, x: number = 0, y: number = 0, numBombs: number = 4) {
    super(id, name, x, y);
    this.numBombs = numBombs;
  }

  getNumBombs(): number {
    return this.numBombs;
  }

  setNumBombs(numBombs: number): void {
    this.numBombs = numBombs;
  }

  // Player-specific methods can be added here
}

export { Player };
