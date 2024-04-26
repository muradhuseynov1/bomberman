import { useCallback, useRef, useState } from 'react';
import { Player } from '../model/player';
import { GameMap, randomPowerUpGenerator } from '../constants/props';

type BombMap = Map<string, number>;

export const useBombManager = (
  playerID: number,
  playersRef: React.MutableRefObject<Player[]>,
  setPlayers: ((player: Player) => void)[],
  map: GameMap,
  setMap: (m: GameMap) => void
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

  const explodeBomb = useCallback((bombId: string): void => {
    const [y, x] = bombId.split('-').map(Number);
    const players = playersRef.current;
    const blastRange = players[playerID].getBombRange();

    // Calculate the explosion range
    const newMap: GameMap = [];
    map.map((row) => newMap.push([...row]));
    const positionsToCheck = [];
    const mapHeight = map.length;
    const mapWidth = map[0].length;

    // Vertical - up and down from the bomb
    for (let dy = -blastRange; dy <= blastRange; dy += 1) {
      const tempY = y + dy;
      if (tempY >= 0 && tempY <= mapHeight) {
        positionsToCheck.push({ newY: tempY, newX: x });
      }
    }

    // Horizontal - left and right from the bomb
    for (let dx = -blastRange; dx <= blastRange; dx += 1) {
      const tempX = x + dx;
      if (tempX >= 0 && tempX <= mapWidth) {
        positionsToCheck.push({ newY: y, newX: x + dx });
      }
    }
    // Check each position in the explosion range
    positionsToCheck.forEach(({ newY, newX }) => {
      // Check for bricks at the position and remove them
      if (map[newY]?.[newX] === 'Box') {
        newMap[newY][newX] = randomPowerUpGenerator();
      }

      // Check for players at the position and kill them if present
      players.forEach((player, index) => {
        if (player.getX() === newX && player.getY() === newY && player.isAlive()) {
          // eslint-disable-next-line no-console
          console.log(`Player ${player.getName()} was killed by the bomb at [${newY}, ${newX}]`);
          player.killPlayer();
          setPlayers[index](Player.fromPlayer(player));
        }
      });
    });

    setMap(newMap);
  }, [playersRef, setPlayers, map, setMap, clearBomb]);

  const dropBomb = useCallback((y: number, x: number): void => {
    if (!playersRef.current[playerID].isAlive()) return;
    if (playersRef.current[playerID].getBombs() <= 0) return;
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
          explodeBomb(bombId);
          clearBomb(bombId);
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
