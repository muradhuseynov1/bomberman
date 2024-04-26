export interface SettingsScreenProps {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
  onModifyControls?: () => void;
}

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

export type PlayerStatusProps = {
  playerName: string;
  numBombs: number;
  powers: Power[];
  numObstacles: number;
  index: number;
}

export interface KeyBindings {
  [playerNumber: string]: string[];
}

export const DEFAULT_KEY_BINDINGS: KeyBindings = {
  1: ['w', 'a', 's', 'd', '2', '3'],
  2: ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'o', 'p'],
  3: ['u', 'h', 'j', 'k', '7', '8']
};

export const arrowKeySymbols: { [key: string]: string } = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→'
};
