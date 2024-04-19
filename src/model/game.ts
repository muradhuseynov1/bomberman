import { Player } from './player';
import { gameItem } from './gameItem';

class Game {
  private players: Player[];

  private map: gameItem[][];
  // Add other properties as needed

  constructor(players: Player[], map: gameItem[][]) {
    this.players = players;
    this.map = map;
    // Initialize other properties
  }

  // Add other methods as needed
}

// Define other classes as needed, e.g., Bomb, Obstacle, etc.

export { Game };
