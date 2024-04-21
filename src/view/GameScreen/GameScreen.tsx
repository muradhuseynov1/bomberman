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
import { GameScreenProps, KeyBindings } from '../../constants/props';
import { Monster } from '../../model/monster';

import ModifyControlsDialog from './SettingsScreen/ModifyControlsDialog';

import { GameLayout } from './GameLayout';
import { useBombManager } from '../../hooks/useBombManager';
import { usePlayerActions } from '../../hooks/usePlayerActions';

export const GameScreen = ({
  playerName,
  numBombs = 4,
  powers = [],
  numObstacles = 4,
}: GameScreenProps) => {
  const { numOfPlayers } = useParams();
  const [player, setPlayer] = useState(new Player('1', playerName, 2, 2));
  const [playerTwo, setPlayerTwo] = useState(new Player('2', 'Player 2', 14, 9));
  const [playerThree, setPlayerThree] = useState(numOfPlayers === '3' ? new Player('3', 'Player 3', 7, 7) : null);
  const { bombs: playerOneBombs, dropBomb: dropPlayerOneBomb } = useBombManager();
  const { bombs: playerTwoBombs, dropBomb: dropPlayerTwoBomb } = useBombManager();
  const { bombs: playerThreeBombs, dropBomb: dropPlayerThreeBomb } = useBombManager();
  const [bricks] = useState(() => generateBricks(10, 15));
  const [monsters, setMonsters] = useState([
    new Monster('monster1', 'Monster 1', 5, 5),
    new Monster('monster2', 'Monster 2', 10, 7),
  ]);
  const [keyBindings, setKeyBindings] = useState<KeyBindings>({});

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModifyingControls, setIsModifyingControls] = useState(false);
  const handleKeyDown = usePlayerActions(
    player,
    playerTwo,
    playerThree,
    setPlayer,
    setPlayerTwo,
    setPlayerThree,
    keyBindings,
    bricks,
    dropPlayerOneBomb,
    dropPlayerTwoBomb,
    dropPlayerThreeBomb,
    playerOneBombs,
    playerTwoBombs,
    playerThreeBombs
  );

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
    if (numOfPlayers === '3' && playerThree) {
      checkPlayerMonsterCollision(player, playerTwo, monsters, playerThree);
    } else {
      checkPlayerMonsterCollision(player, playerTwo, monsters, null);
    }
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

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    setIsPaused(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    setIsPaused(false);
  };

  const handleRestartGame = () => {
    setPlayer(new Player('player1', playerName, 2, 2));
    setPlayerTwo(new Player('player2', 'Player 2', 14, 9));

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
        playerName={playerName}
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
