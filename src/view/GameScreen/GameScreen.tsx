/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import React, {
  useState, useEffect, useCallback, useRef
} from 'react';
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
import { GhostMonster } from '../../model/ghostMonster';
import { SmartMonster } from '../../model/smartMonster';
import { ForkMonster } from '../../model/forkMonster';

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
  const { bombs: playerOneBombs, dropBomb: dropPlayerOneBomb } = useBombManager();
  const { bombs: playerTwoBombs, dropBomb: dropPlayerTwoBomb } = useBombManager();
  const { bombs: playerThreeBombs, dropBomb: dropPlayerThreeBomb } = useBombManager();
  const [bricks] = useState(() => generateBricks(10, 15));
  const [monsters, setMonsters] = useState([
    new SmartMonster('monster1', 'Monster 1', 5, 5),
    new ForkMonster('monster2', 'Monster 2', 10, 7),
    new GhostMonster('monster2', 'Monster 2', 10, 7),
    new Monster('monster2', 'Monster 2', 10, 7),
  ]);
  const [keyBindings, setKeyBindings] = useState<KeyBindings>({});

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModifyingControls, setIsModifyingControls] = useState(false);

  const playerRef = useRef(player);
  const playerTwoRef = useRef(playerTwo);
  const playerThreeRef = useRef(playerThree);

  useEffect(() => {
    playerRef.current = player;
    playerTwoRef.current = playerTwo;
    playerThreeRef.current = playerThree;
  }, [player, playerTwo, playerThree]);

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
    if (!isPaused) {
      setMonsters((currentMonsters: Monster[]) => currentMonsters.map((monster) => {
        const players = [playerRef.current, playerTwoRef.current, playerThreeRef.current].filter(Boolean) as Player[];
        return monster.move(bricks, players);
      }) as (SmartMonster | ForkMonster)[]);
    }
  }, [bricks, isPaused]);

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
      new SmartMonster('monster1', 'Monster 1', 5, 5),
      new ForkMonster('monster2', 'Monster 2', 10, 7),
      new GhostMonster('monster2', 'Monster 2', 10, 7),
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
