/* eslint-disable no-unused-vars */
import { useCallback } from 'react';
import { Player } from '../model/player';

type PlayerInfo = {
  player: Player,
  setNewPlayer: (player: Player) => void,
  dropBomb: (y: number, x: number) => void,
  bombs: Map<string, number>,
  keyBindings: string[],
  enemies: Player[]
};

export const usePlayerActions = (
  playersInfo: Array<PlayerInfo | null>,
  map: string[][]
) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    playersInfo.forEach((info) => {
      if (info !== null) {
        const actions = {
          [info.keyBindings[0]]: () => info.player.move('up', map, info.bombs, info.enemies),
          [info.keyBindings[1]]: () => info.player.move('left', map, info.bombs, info.enemies),
          [info.keyBindings[2]]: () => info.player.move('down', map, info.bombs, info.enemies),
          [info.keyBindings[3]]: () => info.player.move('right', map, info.bombs, info.enemies),
          [info.keyBindings[4]]: () => {
            info.dropBomb(info.player.getY(), info.player.getX()); return info.player;
          },
        };

        const action = actions[event.key];
        if (action) {
          requestAnimationFrame(() => {
            const updatedPlayer = action();
            if (updatedPlayer) {
              info.setNewPlayer(Player.fromPlayer(updatedPlayer));
              // eslint-disable-next-line no-console
              console.log(updatedPlayer.getX(), updatedPlayer.getY());
            }
          });
        }
      }
    });
  }, [playersInfo, map]);

  return handleKeyDown;
};
