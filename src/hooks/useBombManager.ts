import { useCallback, useState } from 'react';
import { Player } from '../model/player';

type BombMap = Map<string, number>;

export const useBombManager = (
  players: Player[],
  setPlayers: ((player: Player) => void)[],
  bricks: Set<string>
) => {
  const [bombs, setBombs] = useState<BombMap>(new Map());

  const explodeBomb = useCallback((bombId: string): void => {
    const [y, x] = bombId.split('-').map(Number);
    const blastRange = 2;

    // Calculate the explosion range
    for (let dy = -blastRange; dy <= blastRange; dy += 1) {
      for (let dx = -blastRange; dx <= blastRange; dx += 1) {
        const affectedArea = `${y + dy}-${x + dx}`;
        if (bricks.has(affectedArea)) {
          bricks.delete(affectedArea); // Remove brick
        }
        players.forEach((player, ind) => {
          if (player.getX() === x + dx && player.getY() === y + dy && player.isAlive()) {
            player.killPlayer();
            setPlayers[ind](Player.fromPlayer(player));
          }
        });
      }
    }

    // eslint-disable-next-line no-shadow
    setBombs((bombs) => {
      const newBombs = new Map(bombs);
      newBombs.delete(bombId);
      return newBombs;
    });
  }, [bricks, players]);

  const dropBomb = useCallback((y: number, x: number): void => {
    const bombId = `${y}-${x}`;
    if (!bombs.has(bombId)) {
      const newBombs = new Map(bombs);
      newBombs.set(bombId, 3); // Countdown starts at 3 seconds

      const interval = setInterval(() => {
        const timeLeft = newBombs.get(bombId);
        if (timeLeft === undefined) {
          clearInterval(interval);
          return;
        }
        if (timeLeft <= 0) {
          explodeBomb(bombId); // Explode the bomb
        } else {
          newBombs.set(bombId, timeLeft - 1);
          setBombs(new Map(newBombs));
        }
      }, 1000);

      setBombs(newBombs);
    }
  }, [bombs, explodeBomb]);

  return { bombs, dropBomb };
};
