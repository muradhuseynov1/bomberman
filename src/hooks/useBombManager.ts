// hooks/useBombManager.ts
import { useState, useCallback } from 'react';

type BombMap = Map<string, number>;

export const useBombManager = () => {
  const [bombs, setBombs] = useState<BombMap>(new Map());
  const [isBombActive, setIsBombActive] = useState(false);

  const dropBomb = useCallback((x: number, y: number) => {
    const bombId = `${x}-${y}`;

    if (!bombs.has(bombId) && !isBombActive) {
      setIsBombActive(true);
      const newBombs = new Map(bombs);
      newBombs.set(bombId, 3);
      setBombs(newBombs);

      const interval = setInterval(() => {
        let timeLeft = newBombs.get(bombId);
        if (timeLeft !== undefined) {
          timeLeft -= 1;
          if (timeLeft <= 0) {
            newBombs.delete(bombId);
            clearInterval(interval);
            setIsBombActive(false);
          } else {
            newBombs.set(bombId, timeLeft);
          }
          setBombs(new Map(newBombs));
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [bombs, isBombActive]);

  return { bombs, dropBomb };
};
