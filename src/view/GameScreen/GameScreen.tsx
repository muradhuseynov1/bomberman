/* eslint-disable no-console */
/* eslint-disable max-len */
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
import { RoundResultDialog } from './RoundResultDialog';

import ModifyControlsDialog from './SettingsScreen/ModifyControlsDialog';

import { GameLayout } from './GameLayout';
import { useBombManager } from '../../hooks/useBombManager';
import { usePlayerActions } from '../../hooks/usePlayerActions';

const playerNames = ['Player 1', 'Player 2', 'Player 3'];
const numBombs = 1;
const powers = ['Detonator', 'RollerSkate'];
const numObstacles = 4;
const defaultMap: never[] = [];

const fetchMap = async () => {
  const mapData = JSON.parse(localStorage.getItem('selectedMap') || '[]');
  return mapData.length > 0 ? mapData : defaultMap;
};

export const GameScreen = () => {
  const { numOfPlayers, numOfRounds, selectedMap } = useParams();
  const [player, setPlayer] = useState(new Player('1', playerNames[0], 1, 1));
  const [playerTwo, setPlayerTwo] = useState(new Player('2', playerNames[1], 13, 8));
  const [playerThree, setPlayerThree] = useState(numOfPlayers === '3' ? new Player('3', playerNames[2], 1, 8) : null);
  const { bombs: playerOneBombs, dropBomb: dropPlayerOneBomb } = useBombManager();
  const { bombs: playerTwoBombs, dropBomb: dropPlayerTwoBomb } = useBombManager();
  const { bombs: playerThreeBombs, dropBomb: dropPlayerThreeBomb } = useBombManager();
  console.log(numOfRounds);
  const [map, setMap] = useState<string[][]>([]);
  const [keyBindings, setKeyBindings] = useState<KeyBindings>({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModifyingControls, setIsModifyingControls] = useState(false);
  const [monsters, setMonsters] = useState([] as Monster[]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  useEffect(() => {
    switch (selectedMap) {
      case 'map1':
        if (numOfPlayers === '3') {
          setMonsters([
            new SmartMonster('monster1', 'Monster 1', 6, 5),
            new Monster('monster2', 'Monster 2', 10, 2),
          ]);
        } else {
          setMonsters([
            new SmartMonster('monster1', 'Monster 1', 6, 5),
            new Monster('monster2', 'Monster 2', 10, 2),
            new Monster('monster3', 'Monster 3', 4, 8),
          ]);
        }
        break;
      case 'map2':
        if (numOfPlayers === '3') {
          setMonsters([
            new GhostMonster('monster1', 'Monster 1', 6, 5),
            new SmartMonster('monster2', 'Monster 2', 10, 2),
          ]);
        } else {
          setMonsters([
            new GhostMonster('monster1', 'Monster 1', 7, 5),
            new SmartMonster('monster2', 'Monster 2', 4, 8),
            new Monster('monster3', 'Monster 3', 6, 1),
          ]);
        }
        break;
      case 'map3':
        if (numOfPlayers === '3') {
          setMonsters([
            new ForkMonster('monster1', 'Monster 1', 7, 4),
            new GhostMonster('monster2', 'Monster 2', 11, 1),
            new Monster('monster3', 'Monster 3', 5, 8),
          ]);
        } else {
          setMonsters([
            new ForkMonster('monster1', 'Monster 1', 9, 1),
            new SmartMonster('monster2', 'Monster 2', 6, 3),
            new Monster('monster3', 'Monster 3', 5, 8),
            new GhostMonster('monster4', 'Monster 4', 8, 6),
          ]);
        }
        break;
      default:
        setMonsters([]);
    }
  }, [selectedMap]);

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
      setMonsters((smartMonsters) => smartMonsters.map((monster, idx, self) => {
        const players = [
          playerRef.current, playerTwoRef.current, playerThreeRef.current
        ].filter(Boolean) as Player[];
        const allBombs = new Map([
          ...playerOneBombsRef.current,
          ...playerTwoBombsRef.current,
          ...playerThreeBombsRef.current
        ]);
        const otherMonsters = self.filter((m, i) => i !== idx);
        if (monster instanceof SmartMonster) {
          return monster.move(map, players, allBombs, otherMonsters);
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
      setMonsters((basicForkMonsters) => basicForkMonsters.map((monster, idx, self) => {
        const players = [
          playerRef.current, playerTwoRef.current, playerThreeRef.current
        ].filter(Boolean) as Player[];
        const allBombs = new Map([
          ...playerOneBombsRef.current,
          ...playerTwoBombsRef.current,
          ...playerThreeBombsRef.current
        ]);
        const otherMonsters = self.filter((m, i) => i !== idx);
        if (monster instanceof ForkMonster || monster instanceof Monster) {
          return monster.move(map, players, allBombs, otherMonsters);
        }
        return monster;
      }));
    }
  }, [isPaused, map]);

  const resetRound = () => {
    setPlayer(new Player('1', playerNames[0], 1, 1, true));
    setPlayerTwo(new Player('2', playerNames[1], 13, 8, true));
    setPlayerThree(numOfPlayers === '3' ? new Player('3', playerNames[2], 1, 8, true) : null);
    if (selectedMap === 'map1') {
      if (numOfPlayers === '3') {
        setMonsters([
          new SmartMonster('monster1', 'Monster 1', 6, 5),
          new Monster('monster2', 'Monster 2', 10, 2),
        ]);
      } else {
        setMonsters([
          new SmartMonster('monster1', 'Monster 1', 6, 5),
          new Monster('monster2', 'Monster 2', 10, 2),
          new Monster('monster3', 'Monster 3', 4, 8),
        ]);
      }
    } else if (selectedMap === 'map2') {
      if (numOfPlayers === '3') {
        setMonsters([
          new GhostMonster('monster1', 'Monster 1', 6, 5),
          new SmartMonster('monster2', 'Monster 2', 10, 2),
        ]);
      } else {
        setMonsters([
          new GhostMonster('monster1', 'Monster 1', 7, 5),
          new SmartMonster('monster2', 'Monster 2', 4, 8),
          new Monster('monster3', 'Monster 3', 6, 1),
        ]);
      }
    } else if (selectedMap === 'map3') {
      if (numOfPlayers === '3') {
        setMonsters([
          new ForkMonster('monster1', 'Monster 1', 7, 4),
          new GhostMonster('monster2', 'Monster 2', 11, 1),
          new Monster('monster3', 'Monster 3', 5, 8),
        ]);
      } else {
        setMonsters([
          new ForkMonster('monster1', 'Monster 1', 9, 1),
          new SmartMonster('monster2', 'Monster 2', 6, 3),
          new Monster('monster3', 'Monster 3', 5, 8),
          new GhostMonster('monster4', 'Monster 4', 8, 6),
        ]);
      }
    }
  };

  const checkEndOfRound = () => {
    const activePlayers = [player, playerTwo, playerThree].filter((p) => p && p.isActive());

    if (activePlayers.length <= 1) {
      const recheckedActivePlayers = [player, playerTwo, playerThree].filter((p) => p && p.isActive());
      if (recheckedActivePlayers.length === 1) {
        setResultMessage(`${recheckedActivePlayers[0]?.getName()} wins the round!`);
      } else if (recheckedActivePlayers.length === 0) {
        setResultMessage('No players left, draw!');
      }
      setDialogOpen(true);
      setIsPaused(true);
      resetRound();
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setIsPaused(false);
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
          (prev) => new Player(prev.getId(), prev.getName(), 0, 0, false)
        );
      }
      if (currentPlayerTwo && collisionMonster.getX() === currentPlayerTwo.getX() && collisionMonster.getY() === currentPlayerTwo.getY()) {
        setPlayerTwo(
          (prev) => new Player(prev.getId(), prev.getName(), 14, 9, false)
        );
      }
      if (currentPlayerThree && collisionMonster.getX() === currentPlayerThree.getX() && collisionMonster.getY() === currentPlayerThree.getY()) {
        setPlayerThree(
          (prev) => (prev ? new Player(prev.getId(), prev.getName(), 0, 9, false) : null)
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
    const smartInterval = setInterval(moveSmartMonsters, 600);
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
      new ForkMonster('monster2', 'Monster 2', 5, 8),
      new GhostMonster('monster2', 'Monster 2', 9, 7),
      new Monster('monster2', 'Monster 2', 10, 5),
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
      players={[player, playerTwo, playerThree].filter((p) => p?.isActive()) as Player[]}
      monsters={monsters}
      map={map}
      bombs={new Map([...playerOneBombs, ...playerTwoBombs, ...playerThreeBombs])}
    />
  )));

  return (
    <StyledBackground>
      <RoundResultDialog open={dialogOpen} onClose={handleClose} resultMessage={resultMessage} />
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
