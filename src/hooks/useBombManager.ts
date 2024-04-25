import { useCallback, useState, useRef } from 'react';
import { Player } from '../model/player';

type BombMap = Map<string, number>;

export const useBombManager = (
  playerID: number,
  playersRef: React.MutableRefObject<Player[]>,
  setPlayers: ((player: Player) => void)[],
  map: string[][],
  setMap: (m: string[][]) => void
) => {
  const [bombs, setBombs] = useState<BombMap>(new Map());
  const intervals = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const clearBomb = useCallback((bombId: string) => {
    const interval = intervals.current.get(bombId);
    if (interval) {
      clearInterval(interval);
      intervals.current.delete(bombId);
    }
    setBombs((prev) => {
      const newBombs = new Map(prev);
      newBombs.delete(bombId);
      return newBombs;
    });
  }, []);

  const explodeBomb = useCallback((x: number, y: number) => {
    const players = playersRef.current;
    const blastRange = players[playerID].getBombRange();

    // Calculate the explosion effect
    const newMap = map.map((row) => [...row]);
    // Implement explosion logic for bricks and players
    for (let dx = -blastRange; dx <= blastRange; dx += 1) {
      for (let dy = -blastRange; dy <= blastRange; dy += 1) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length) {
          if (map[newY][newX] === 'B') {
            newMap[newY][newX] = 'P'; // Replace brick with power-up
          }
          players.forEach((player, index) => {
            if (player.getX() === newX && player.getY() === newY) {
              player.killPlayer(); // Assume killPlayer method exists on Player
              setPlayers[index](Player.fromPlayer(player));
            }
          });
        }
      }
    }

    setMap(newMap);
    clearBomb(`${x}-${y}`);
  }, [map, setMap, playersRef, clearBomb]);

  const dropBomb = useCallback((x: number, y: number) => {
    const bombId = `${x}-${y}`;
    if (!bombs.has(bombId)) {
      setBombs(new Map(bombs).set(bombId, 3)); // Set countdown to 3 seconds
      const interval = setInterval(() => {
        setBombs((prev) => {
          const timeLeft = prev.get(bombId);
          if (timeLeft !== undefined) {
            if (timeLeft <= 1) {
              explodeBomb(x, y);
            } else {
              return new Map(prev).set(bombId, timeLeft - 1);
            }
          }
          return prev;
        });
      }, 1000);
      intervals.current.set(bombId, interval);
    }
  }, [bombs, explodeBomb]);

  return { bombs, dropBomb };
};
