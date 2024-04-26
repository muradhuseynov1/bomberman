/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export type Power = 'AddBomb' | 'BlastRangeUp' | 'Detonator' | 'RollerSkate' | 'Invincibility' | 'Ghost' | 'Obstacle';

export type BaseContent = 'Empty' | 'Box' | 'Wall';

export interface Obstacle {
  ownerId: string;
  coords: {x: number, y: number};
}

export interface Bomb {
  range: number;
  coords: {x: number, y: number};
  ownerId?: string; // if a player with Detonator power places the bomb, this stores the player's id
}

export type gameItem = BaseContent | Power | Obstacle | Bomb;

export type GameMap = gameItem[][];

export function randomPowerUpGenerator(): Power {
  const powerUpOptions: Power[] = ['AddBomb', 'BlastRangeUp', 'Detonator', 'RollerSkate', 'Invincibility', 'Ghost', 'Obstacle'];
  return powerUpOptions[Math.floor(Math.random() * powerUpOptions.length)];
}

export const isPower = (cell: gameItem): cell is Power => {
  const powerUpOptions: Power[] = ['AddBomb', 'BlastRangeUp', 'Detonator', 'RollerSkate', 'Invincibility', 'Ghost', 'Obstacle'];
  return powerUpOptions.includes(cell as Power);
};

export function isBomb(item: gameItem): item is Bomb {
  return typeof item === 'object' && 'range' in item && 'coords' in item;
}
