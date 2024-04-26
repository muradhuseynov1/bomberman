import { Player } from '../model/player';

export interface SettingsScreenProps {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
  onModifyControls?: () => void;
}

export type PlayerStatusProps = {
  player: Player;
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
