import { Character } from './character';

class Monster extends Character {
  // Monster-specific properties and methods

  constructor(id: string, name: string, x: number = 0, y: number = 0) {
    super(id, name, x, y);
    // Initialize monster-specific properties
  }

  // Monster-specific methods can be added here
}

export { Monster };
