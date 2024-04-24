// /* eslint-disable max-len */
/* eslint-disable consistent-return */
import React, { useState, useEffect, useCallback } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { useParams } from 'react-router-dom';
import {
  StyledSettingsButton,
} from './GameScreen.styles';
import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';
import { Player } from '../../model/player';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import { generateBricks } from '../../helpers/generateBricks';
import { GridCellComponent } from './GridCellComponent';
import { KeyBindings } from '../../constants/props';
import { Monster } from '../../model/monster';

import ModifyControlsDialog from './SettingsScreen/ModifyControlsDialog';

import { GameLayout } from './GameLayout';
import { useBombManager } from '../../hooks/useBombManager';
import { usePlayerActions } from '../../hooks/usePlayerActions';

const playerNames = ['Player One', 'Player Two', 'Player Three'];
const numBombs = 4;
const powers = ['Detonator', 'RollerSkate'];
const numObstacles = 4;

export const GameScreen = () => {
  const { numOfPlayers } = useParams();
  const [player, setPlayer] = useState(new Player('1', playerNames[0], 2, 2));
  const [playerTwo, setPlayerTwo] = useState(new Player('2', playerNames[1], 14, 9));
  const [playerThree, setPlayerThree] = useState(numOfPlayers === '3' ? new Player('3', playerNames[2], 7, 7) : null);
  const players = [player, playerTwo, playerThree].filter((p): p is Player => p !== null);
  const setPlayers = [setPlayer, setPlayerTwo, setPlayerThree];
  const [bricks] = useState(() => generateBricks(10, 15));
  const {
    bombs: playerOneBombs,
    dropBomb: dropPlayerOneBomb
  } = useBombManager(players, setPlayers, bricks);
  const {
    bombs: playerTwoBombs,
    dropBomb: dropPlayerTwoBomb
  } = useBombManager(players, setPlayers, bricks);
  const {
    bombs: playerThreeBombs,
    dropBomb: dropPlayerThreeBomb
  } = useBombManager(players, setPlayers, bricks);
  const [monsters, setMonsters] = useState([
    new Monster('monster1', 'Monster 1', 5, 5),
    new Monster('monster2', 'Monster 2', 10, 7),
  ]);
  const [keyBindings, setKeyBindings] = useState<KeyBindings>({});

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModifyingControls, setIsModifyingControls] = useState(false);
  const handleKeyDown = usePlayerActions([
    {
      player,
      setNewPlayer: setPlayer,
      dropBomb: dropPlayerOneBomb,
      bombs: playerOneBombs,
      keyBindings: keyBindings['1'],
      enemies: [playerTwo, playerThree].filter((p): p is Player => p !== null),
    },
    {
      player: playerTwo,
      setNewPlayer: setPlayerTwo,
      dropBomb: dropPlayerTwoBomb,
      bombs: playerTwoBombs,
      keyBindings: keyBindings['2'],
      enemies: [player, playerThree].filter((p): p is Player => p !== null),
    },
    playerThree ? {
      player: playerThree,
      setNewPlayer: setPlayerThree,
      dropBomb: dropPlayerThreeBomb,
      bombs: playerThreeBombs,
      keyBindings: keyBindings['3'],
      enemies: [player, playerTwo]
    } : null
  ], bricks);

  useEffect(() => {
    const storedBindings = localStorage.getItem('playerKeyBindings');
    if (storedBindings) {
      const parsedBindings = JSON.parse(storedBindings);
      setKeyBindings(parsedBindings);
    }
  }, []);

  const moveMonsters = useCallback(() => {
    setMonsters((currentMonsters) => currentMonsters.map((monster) => {
      const result = monster.move(bricks);
      return result;
    }));
  }, [bricks]);

  const checkPlayerMonsterCollision = useCallback((
    currentPlayer: Player,
    currentPlayerTwo: Player,
    currentMonsters: Monster[],
    currentPlayerThree: Player | null
  ) => {
    currentMonsters.forEach((monsterTemp) => {
      if (monsterTemp.getX() === currentPlayer.getX()
        && monsterTemp.getY() === currentPlayer.getY()) {
        setPlayer((prev) => new Player(prev.getId(), prev.getName(), 2, 2));
      }
      if (monsterTemp.getX() === currentPlayerTwo.getX()
        && monsterTemp.getY() === currentPlayerTwo.getY()) {
        setPlayerTwo((prev) => new Player(prev.getId(), prev.getName(), 14, 9));
      }
      if (currentPlayerThree && monsterTemp.getX() === currentPlayerThree.getX()
        && monsterTemp.getY() === currentPlayerThree.getY()) {
        setPlayerThree((prev) => (prev ? new Player(prev.getId(), prev.getName(), 7, 7) : null));
      }
    });
  }, []);

  useEffect(() => {
    checkPlayerMonsterCollision(player, playerTwo, monsters, playerThree ?? null);
  }, [player, playerTwo, monsters, checkPlayerMonsterCollision, playerThree, numOfPlayers]);

  useEffect(() => {
    if (isPaused) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveMonsters();
    }, 700);

    return () => clearInterval(interval);
  }, [moveMonsters]);

  useEffect(() => {
    if (!player.isAlive()) {
      // Show death screen or disable player controls
      // eslint-disable-next-line no-console
      console.log(`${player.getName()} has been defeated.`);
    }
  }, [player.isAlive()]);

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    setIsPaused(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    setIsPaused(false);
  };

  const handleRestartGame = () => {
    setPlayer(new Player('player1', playerNames[0], 2, 2));
    setPlayerTwo(new Player('player2', playerNames[1], 14, 9));

    setMonsters([
      new Monster('monster1', 'Monster 1', 5, 5),
      new Monster('monster2', 'Monster 2', 10, 7),
    ]);
    setIsSettingsOpen(false);

    setIsPaused(false);
  };

  const saveAndCloseModifyControls = () => {
    setIsModifyingControls(false);
    setIsPaused(false);
  };

  const renderCellsAndPlayer = () => Array.from({ length: 150 }, (_, index) => {
    const row = Math.floor(index / 15) + 1;
    const column = (index % 15) + 1;
    return (
      <GridCellComponent
        key={index}
        index={index}
        row={row}
        column={column}
        players={[player, playerTwo, playerThree].filter((p): p is Player => p !== null)}
        monsters={monsters}
        bricks={bricks}
        bombs={new Map([...playerOneBombs, ...playerTwoBombs, ...playerThreeBombs])}
      />
    );
  });

  return (
    <StyledBackground>
      <StyledSettingsButton onClick={handleOpenSettings}>
        <SettingsIcon />
      </StyledSettingsButton>
      <GameLayout
        playerName={playerNames[0]}
        numBombs={numBombs}
        powers={powers}
        numObstacles={numObstacles}
        numOfPlayers={String(numOfPlayers)}
        renderCellsAndPlayer={renderCellsAndPlayer}
      />
      <SettingsScreen
        open={isSettingsOpen}
        onClose={handleCloseSettings}
        onRestart={handleRestartGame}
        onModifyControls={() => {
          setIsModifyingControls(true);
          setIsPaused(true);
        }}
      />
      <ModifyControlsDialog
        isOpen={isModifyingControls}
        onClose={() => {
          setIsModifyingControls(false);
          setIsPaused(false);
        }}
        onSave={saveAndCloseModifyControls}
        keyBindings={keyBindings}
        numOfPlayers={String(numOfPlayers)}
      />
    </StyledBackground>
  );
};
