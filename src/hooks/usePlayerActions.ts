/* eslint-disable no-unused-vars */
import { useCallback } from 'react';
import { Player } from '../model/player';

export const usePlayerActions = (
  player: Player,
  playerTwo: Player,
  playerThree: Player | null,
  setPlayer: (player1: Player) => void,
  setPlayerTwo: (player2: Player) => void,
  setPlayerThree: (player3: Player | null) => void,
  keyBindings: { [playerNumber: string]: string[] },
  bricks: Set<string>,
  dropPlayerOneBomb: (y: number, x: number) => void,
  dropPlayerTwoBomb: (y: number, x: number) => void,
  dropPlayerThreeBomb: (y: number, x: number) => void,
  playerOneBombs: Map<string, number>,
  playerTwoBombs: Map<string, number>,
  playerThreeBombs: Map<string, number>
) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const playerOneEnemies = [playerTwo, playerThree].filter((p): p is Player => p !== null);
    const playerTwoEnemies = [player, playerThree].filter((p): p is Player => p !== null);
    const playerThreeEnemies = [player, playerTwo];

    const playerActions = {
      [keyBindings['1'][0]]: () => player.move('up', bricks, playerOneBombs, playerOneEnemies),
      [keyBindings['1'][1]]: () => player.move('left', bricks, playerOneBombs, playerOneEnemies),
      [keyBindings['1'][2]]: () => player.move('down', bricks, playerOneBombs, playerOneEnemies),
      [keyBindings['1'][3]]: () => player.move('right', bricks, playerOneBombs, playerOneEnemies),
      [keyBindings['1'][4]]: () => { dropPlayerOneBomb(player.getY(), player.getX()); return player; },
      [keyBindings['2'][0]]: () => playerTwo.move('up', bricks, playerTwoBombs, playerTwoEnemies),
      [keyBindings['2'][1]]: () => playerTwo.move('left', bricks, playerTwoBombs, playerTwoEnemies),
      [keyBindings['2'][2]]: () => playerTwo.move('down', bricks, playerTwoBombs, playerTwoEnemies),
      [keyBindings['2'][3]]: () => playerTwo.move('right', bricks, playerTwoBombs, playerTwoEnemies),
      [keyBindings['2'][4]]: () => { dropPlayerTwoBomb(playerTwo.getY(), playerTwo.getX()); return playerTwo; },
    };

    if (playerThree) {
      playerActions[keyBindings['3'][0]] = () => playerThree?.move('up', bricks, playerThreeBombs, playerThreeEnemies);
      playerActions[keyBindings['3'][1]] = () => playerThree?.move('left', bricks, playerThreeBombs, playerThreeEnemies);
      playerActions[keyBindings['3'][2]] = () => playerThree?.move('down', bricks, playerThreeBombs, playerThreeEnemies);
      playerActions[keyBindings['3'][3]] = () => playerThree?.move('right', bricks, playerThreeBombs, playerThreeEnemies);
      playerActions[keyBindings['3'][4]] = () => { dropPlayerThreeBomb(playerThree.getY(), playerThree.getX()); return playerThree; };
    }

    const action = playerActions[event.key];
    if (action) {
      requestAnimationFrame(() => {
        const updatedPlayer = action();
        if (updatedPlayer) {
          if (updatedPlayer.getId() === player.getId()) {
            setPlayer(new Player(
              updatedPlayer.getId(),
              updatedPlayer.getName(),
              updatedPlayer.getX(),
              updatedPlayer.getY()
            ));
          } else if (updatedPlayer.getId() === playerTwo.getId()) {
            setPlayerTwo(new Player(
              updatedPlayer.getId(),
              updatedPlayer.getName(),
              updatedPlayer.getX(),
              updatedPlayer.getY()
            ));
          } else if (updatedPlayer.getId() === playerThree?.getId()) {
            setPlayerThree(new Player(
              updatedPlayer.getId(),
              updatedPlayer.getName(),
              updatedPlayer.getX(),
              updatedPlayer.getY()
            ));
          }
        }
      });
    }
  }, [keyBindings, bricks, player, playerTwo, playerThree,
    dropPlayerOneBomb, dropPlayerTwoBomb, dropPlayerThreeBomb,
    setPlayer, setPlayerTwo, setPlayerThree]);

  return handleKeyDown;
};
