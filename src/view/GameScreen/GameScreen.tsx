/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
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
import {
  GameMap,
  gameItem,
  randomPowerUpGenerator
} from '../../model/gameItem';

import { Monster } from '../../model/monster';

import ModifyControlsDialog from './SettingsScreen/ModifyControlsDialog';

import { GameLayout } from './GameLayout';
import { useBombManager } from '../../hooks/useBombManager';
import { usePlayerActions } from '../../hooks/usePlayerActions';

const playerNames = ['Player One', 'Player Two', 'Player Three'];
const defaultMap: never[] = [];

const fetchMap = async (): Promise<GameMap> => {
  const mapDataString = localStorage.getItem('selectedMap') || '[]';
  let mapData;
  try {
    mapData = JSON.parse(mapDataString);
  } catch (error) {
    console.error('Failed to parse map data:', mapDataString);
    return defaultMap; // Return the default map if parsing fails
  }

  // Check if the parsed data is an array of strings
  if (!Array.isArray(mapData) || !mapData.every((row) => Array.isArray(row))) {
    console.error('Invalid map data:', mapData);
    return defaultMap; // Return the default map if data is invalid
  }
  // If no map data is available, return the default map
  if (mapData.length <= 0) return defaultMap;

  // Convert the string data to GameMap format
  const initialMap: GameMap = mapData.map((row: Array<string>) => {
    const mapRow: gameItem[] = row.map((cell: string) => {
      switch (cell) {
        case ' ':
          return 'Empty';
        case 'W':
          return 'Wall';
        case 'B':
          return 'Box';
        case 'P':
          return randomPowerUpGenerator();
        default:
          throw new Error(`Invalid map data: unexpected character '${cell}'`);
      }
    });
    return mapRow;
  });

  return initialMap;
};

export const GameScreen = () => {
  const { numOfPlayers } = useParams();
  const [player, setPlayer] = useState(new Player('1', playerNames[0], 1, 1));
  const [playerTwo, setPlayerTwo] = useState(new Player('2', playerNames[1], 13, 8));
  const [playerThree, setPlayerThree] = useState(numOfPlayers === '3' ? new Player('3', playerNames[2], 7, 7) : null);
  const [map, setMap] = useState<GameMap>([]);
  const playersRef = useRef([player, playerTwo, playerThree].filter((p): p is Player => p !== null));
  playersRef.current = [player, playerTwo, playerThree].filter((p): p is Player => p !== null);
  const setPlayers = [setPlayer, setPlayerTwo, setPlayerThree];
  const {
    dropBomb: dropPlayerOneBomb
  } = useBombManager(0, playersRef, setPlayers, map, setMap);
  const {
    dropBomb: dropPlayerTwoBomb
  } = useBombManager(1, playersRef, setPlayers, map, setMap);
  const {
    dropBomb: dropPlayerThreeBomb
  } = useBombManager(2, playersRef, setPlayers, map, setMap);
  const [monsters, setMonsters] = useState([
    new Monster('monster1', 'Monster 1', 5, 5),
    new Monster('monster2', 'Monster 2', 10, 7),
  ]);
  const [keyBindings, setKeyBindings] = useState<KeyBindings>({});

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModifyingControls, setIsModifyingControls] = useState(false);

  useEffect(() => {
    if (map.length === 0) {
      fetchMap().then(setMap);
    }
  }, []);

  const handleKeyDown = usePlayerActions([
    {
      player,
      setNewPlayer: setPlayer,
      dropBomb: dropPlayerOneBomb,
      keyBindings: keyBindings['1'],
      enemies: [playerTwo, playerThree].filter((p): p is Player => p !== null),
    },
    {
      player: playerTwo,
      setNewPlayer: setPlayerTwo,
      dropBomb: dropPlayerTwoBomb,
      keyBindings: keyBindings['2'],
      enemies: [player, playerThree].filter((p): p is Player => p !== null),
    },
    playerThree ? {
      player: playerThree,
      setNewPlayer: setPlayerThree,
      dropBomb: dropPlayerThreeBomb,
      keyBindings: keyBindings['3'],
      enemies: [player, playerTwo]
    } : null
  ], map, setMap);

  useEffect(() => {
    const storedBindings = localStorage.getItem('playerKeyBindings');
    if (storedBindings) {
      const parsedBindings = JSON.parse(storedBindings);
      setKeyBindings(parsedBindings);
    }
  }, []);

  const moveMonsters = useCallback(() => {
    setMonsters((currentMonsters) => currentMonsters.map((monster) => {
      const result = monster.move(map);
      return result;
    }));
  }, [map]);

  const checkPlayerMonsterCollision = useCallback((
    currentPlayer: Player,
    currentPlayerTwo: Player,
    currentMonsters: Monster[],
    currentPlayerThree: Player | null
  ) => {
    currentMonsters.forEach((monsterTemp) => {
      if (monsterTemp.getX() === currentPlayer.getX()
        && monsterTemp.getY() === currentPlayer.getY()
        && currentPlayer.isAlive()
        && currentPlayer.isInvincible() === false) {
        currentPlayer.killPlayer();
        setPlayer(Player.fromPlayer(currentPlayer));
      }
      if (monsterTemp.getX() === currentPlayerTwo.getX()
        && monsterTemp.getY() === currentPlayerTwo.getY()
        && currentPlayerTwo.isAlive()
        && currentPlayerTwo.isInvincible() === false) {
        currentPlayerTwo.killPlayer();
        setPlayerTwo(Player.fromPlayer(currentPlayerTwo));
      }
      if (currentPlayerThree && monsterTemp.getX() === currentPlayerThree.getX()
        && monsterTemp.getY() === currentPlayerThree.getY()
        && currentPlayerThree.isAlive()
        && currentPlayerThree.isInvincible() === false) {
        currentPlayerThree.killPlayer();
        setPlayerThree(Player.fromPlayer(currentPlayerThree));
      }
    });
  }, [map]);

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
    setPlayer(new Player('player1', playerNames[0], 1, 1));
    setPlayerTwo(new Player('player2', playerNames[1], 13, 8));

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

  const renderCellsAndPlayer = () => map.flatMap((row, rowIndex) => row.map((cell, colIndex) => (
    <GridCellComponent
      // eslint-disable-next-line react/no-array-index-key
      key={`${rowIndex}-${colIndex}`}
      row={rowIndex}
      column={colIndex}
      players={[player, playerTwo, playerThree].filter((p) => p !== null) as Player[]}
      monsters={monsters}
      map={map}
    />
  )));

  return (
    <StyledBackground>
      <StyledSettingsButton onClick={handleOpenSettings}>
        <SettingsIcon />
      </StyledSettingsButton>
      <GameLayout
        player={player}
        playerTwo={playerTwo}
        playerThree={playerThree}
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
