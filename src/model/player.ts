/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-cycle

import { GameMap, Power } from '../constants/props';

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

  constructor(
    id: string,
    name: string,
    x: number,
    y: number,
    isActive: boolean = true,
    bombs: number = 4,
    bombRange: number = 2,
    powerUps: Power[] = [],
    obstacles: number = 0
  ) {
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

  move(
    direction: string,
    map: string[][],
    bombs: Map<string, number>,
    otherPlayers: Player[],
    setMap: (m: string[][]) => void
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
      this.checksPowerUp(map, setMap);
    }

    return this;
  }

  addPowerUp(powerUp: Power): void {
    switch (powerUp) {
      case 'AddBomb':
        this.bombs += 1;
        break;
      case 'BlastRangeUp':
        this.bombRange += 1;
        break;
      case 'Obstacle':
        this.obstacles += 3;
        this.powerUps.push(powerUp);
        break;
      default:
        this.powerUps.push(powerUp);
        break;
    }
    console.log(`${this.name} has picked up a ${powerUp} power-up.`);
  }

  checksPowerUp(map: string[][], setMap: (m: string[][]) => void): void {
    const powerUp = map[this.y][this.x];
    if (powerUp === 'P') {
      const powerUpOptions: Power[] = ['AddBomb', 'BlastRangeUp', 'Detonator', 'RollerSkate', 'Invincibility', 'Ghost', 'Obstacle'];
      const randomPowerUp = powerUpOptions[Math.floor(Math.random() * powerUpOptions.length)];
      this.addPowerUp(randomPowerUp);
      const newMap = [...map];
      newMap[this.y][this.x] = ' ';
      setMap(newMap);
    }
  }

  // eslint-disable-next-line no-unused-vars
  isValidMove(y: number, x: number, map: string[][], bombs: Map<string, number>): boolean {
    return (map[y][x] === ' ' || map[y][x] === 'P') && !bombs.has(`${y}-${x}`);
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

  getBombs(): number {
    return this.bombs;
  }

  getBombRange(): number {
    return this.bombRange;
  }

  getPowerUps(): Power[] {
    return this.powerUps;
  }

  getObstacles(): number {
    return this.obstacles;
  }

  isAlive(): boolean {
    return this.isActive;
  }
}

export { Player };
