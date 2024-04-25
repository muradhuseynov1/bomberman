/* eslint-disable max-len */
/* eslint-disable no-alert */
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
const numBombs = 1;
const powers = ['Detonator', 'RollerSkate'];
const numObstacles = 4;
const defaultMap: never[] = [];

const fetchMap = async () => {
  const mapData = JSON.parse(localStorage.getItem('selectedMap') || '[]');
  return mapData.length > 0 ? mapData : defaultMap;
};

export const GameScreen = () => {
  const { numOfPlayers } = useParams();
  const [player, setPlayer] = useState(new Player('1', playerNames[0], 1, 1));
  const [playerTwo, setPlayerTwo] = useState(new Player('2', playerNames[1], 13, 8));
  const [playerThree, setPlayerThree] = useState(numOfPlayers === '3' ? new Player('3', playerNames[2], 7, 7) : null);
  const { bombs: playerOneBombs, dropBomb: dropPlayerOneBomb } = useBombManager();
  const { bombs: playerTwoBombs, dropBomb: dropPlayerTwoBomb } = useBombManager();
  const { bombs: playerThreeBombs, dropBomb: dropPlayerThreeBomb } = useBombManager();
  const [map, setMap] = useState<string[][]>([]);
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

  useEffect(() => {
    fetchMap().then(setMap);
  }, []);

  const playerRef = useRef(player);
  const playerTwoRef = useRef(playerTwo);
  const playerThreeRef = useRef(playerThree);
  const playerOneBombsRef = useRef(playerOneBombs);
  const playerTwoBombsRef = useRef(playerTwoBombs);
  const playerThreeBombsRef = useRef(playerThreeBombs);
  const smartMonstersRef = useRef<Monster[]>([]);
  const ghostMonstersRef = useRef<Monster[]>([]);
  const forkMonstersRef = useRef<Monster[]>([]);

  useEffect(() => {
    smartMonstersRef.current = monsters.filter((monster) => monster instanceof SmartMonster);
    ghostMonstersRef.current = monsters.filter((monster) => monster instanceof GhostMonster);
    forkMonstersRef.current = monsters.filter((monster) => monster instanceof ForkMonster);
  }, [monsters]);

  useEffect(() => {
    playerRef.current = player;
    playerTwoRef.current = playerTwo;
    playerThreeRef.current = playerThree;
  }, [player, playerTwo, playerThree]);

  useEffect(() => {
    playerOneBombsRef.current = playerOneBombs;
    playerTwoBombsRef.current = playerTwoBombs;
    playerThreeBombsRef.current = playerThreeBombs;
  }, [playerOneBombs, playerTwoBombs, playerThreeBombs]);

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
  ], map);

  useEffect(() => {
    const storedBindings = localStorage.getItem('playerKeyBindings');
    if (storedBindings) {
      const parsedBindings = JSON.parse(storedBindings);
      setKeyBindings(parsedBindings);
    }
  }, []);

  const moveSmartMonsters = useCallback(() => {
    if (!isPaused) {
      setMonsters((smartMonsters) => smartMonsters.map((monster) => {
        const players = [
          playerRef.current, playerTwoRef.current, playerThreeRef.current
        ].filter(Boolean) as Player[];
        const allBombs = new Map([
          ...playerOneBombsRef.current,
          ...playerTwoBombsRef.current,
          ...playerThreeBombsRef.current
        ]);
        if (monster instanceof SmartMonster) {
          return monster.move(map, players, allBombs);
        }
        return monster;
      }));
    }
  }, [isPaused, map]);

  const moveGhostMonsters = useCallback(() => {
    if (!isPaused) {
      setMonsters((ghostMonsters) => ghostMonsters.map((monster) => {
        const players = [
          playerRef.current, playerTwoRef.current, playerThreeRef.current
        ].filter(Boolean) as Player[];
        const allBombs = new Map([
          ...playerOneBombsRef.current,
          ...playerTwoBombsRef.current,
          ...playerThreeBombsRef.current
        ]);
        if (monster instanceof GhostMonster) {
          return monster.move(map, players, allBombs);
        }
        return monster;
      }));
    }
  }, [isPaused, map]);

  const moveForkMonsters = useCallback(() => {
    if (!isPaused) {
      setMonsters((basicForkMonsters) => basicForkMonsters.map((monster) => {
        const players = [
          playerRef.current, playerTwoRef.current, playerThreeRef.current
        ].filter(Boolean) as Player[];
        const allBombs = new Map([
          ...playerOneBombsRef.current,
          ...playerTwoBombsRef.current,
          ...playerThreeBombsRef.current
        ]);
        if (monster instanceof ForkMonster || monster instanceof Monster) {
          return monster.move(map, players, allBombs);
        }
        return monster;
      }));
    }
  }, [isPaused, map]);

  const resetGame = () => {
    // Reset players and potentially the game state
    setPlayer(new Player('1', playerNames[0], 1, 1, true));
    setPlayerTwo(new Player('2', playerNames[1], 13, 8, true));
    setPlayerThree(numOfPlayers === '3' ? new Player('3', playerNames[2], 7, 7, true) : null);
    // Other state resets as necessary
  };

  const checkEndOfRound = () => {
    const activePlayers = [player, playerTwo, playerThree].filter((p) => p && p.isActive());

    if (activePlayers.length === 1) {
      alert(`${activePlayers[0]?.getName()} wins the round!`);
      resetGame(); // Reset game to initial conditions or go to next round
    } else if (activePlayers.length === 0) {
      alert('No players left, draw!');
      resetGame();
    }
    // else: If more than one player is still active, do nothing and wait for more gameplay.
  };

  const checkPlayerMonsterCollision = useCallback((
    currentPlayer: Player,
    currentPlayerTwo: Player,
    currentPlayerThree: Player | null,
    currentMonsters: Monster[]
  ) => {
    currentMonsters.forEach((collisionMonster) => {
      if (collisionMonster.getX() === currentPlayer.getX() && collisionMonster.getY() === currentPlayer.getY()) {
        setPlayer(
          (prev) => new Player(prev.getId(), prev.getName(), prev.getX(), prev.getY(), false)
        );
      }
      if (currentPlayerTwo && collisionMonster.getX() === currentPlayerTwo.getX() && collisionMonster.getY() === currentPlayerTwo.getY()) {
        setPlayerTwo(
          (prev) => new Player(prev.getId(), prev.getName(), prev.getX(), prev.getY(), false)
        );
      }
      if (currentPlayerThree && collisionMonster.getX() === currentPlayerThree.getX() && collisionMonster.getY() === currentPlayerThree.getY()) {
        setPlayerThree(
          (prev) => (prev ? new Player(prev.getId(), prev.getName(), prev.getX(), prev.getY(), false) : null)
        );
      }
    });
    checkEndOfRound();
  }, [player, playerTwo, playerThree, monsters]);

  useEffect(() => {
    checkPlayerMonsterCollision(player, playerTwo, playerThree, monsters);
  }, [player, playerTwo, monsters, playerThree]);

  useEffect(() => {
    if (isPaused) return;
    window.addEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const smartInterval = setInterval(moveSmartMonsters, 400);
    const ghostInterval = setInterval(moveGhostMonsters, 1000);
    const forkInterval = setInterval(moveForkMonsters, 700);

    return () => {
      clearInterval(smartInterval);
      clearInterval(ghostInterval);
      clearInterval(forkInterval);
    };
  }, [moveSmartMonsters, moveGhostMonsters, moveForkMonsters]);

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    setIsPaused(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    setIsPaused(false);
  };

  const handleRestartGame = () => {
    setPlayer(new Player('player1', playerNames[0], 1, 1));
    setPlayerTwo(new Player('player2', playerNames[1], 13, 8));

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

  const renderCellsAndPlayer = () => map.flatMap((row, rowIndex) => row.map((cell, colIndex) => (
    <GridCellComponent
      // eslint-disable-next-line react/no-array-index-key
      key={`${rowIndex}-${colIndex}`}
      row={rowIndex}
      column={colIndex}
      players={[player, playerTwo, playerThree].filter((p) => p !== null) as Player[]}
      monsters={monsters}
      map={map}
      bombs={new Map([...playerOneBombs, ...playerTwoBombs, ...playerThreeBombs])}
    />
  )));

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
