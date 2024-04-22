/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Paper, DialogTitle, DialogContent, Button, DialogActions
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import { useParams } from 'react-router-dom';
import {
  MapContainer,
  MyGrid,
  GridCell,
  StyledGameDialog,
  CharacterContainer,
  StyledSettingsButton,
} from './GameScreen.styles';
import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';
import { PlayerStatus } from './PlayerStatusScreen/PlayerStatusScreen';
import { Player } from '../../model/player';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import { generateBricks } from '../../helpers/generateBricks';
import bombermanPlayer from '../../assets/player-image.png';
import wall from '../../assets/wall.jpeg';
import brick from '../../assets/brick.jpeg';
import monster from '../../assets/monster.png';
import bomb from '../../assets/bomb.png';
import {
  ControlsLabel, ExtraKeys, KeyConfigInput, KeyGroup, PlayerControlsRow, StyledDialog
} from '../ConfigScreen/ConfigScreen.styles';
import { GameScreenProps, KeyBindings, arrowKeySymbols } from '../../constants/props';
import { Monster } from '../../model/monster';
import { GhostMonster } from '../../model/ghostMonster';
import { SmartMonster } from '../../model/smartMonster';
import { ForkMonster } from '../../model/forkMonster';

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
  const [playerOneBombs, setPlayerOneBombs] = useState(new Map());
  const [playerTwoBombs, setPlayerTwoBombs] = useState(new Map());
  const [playerThreeBombs, setPlayerThreeBombs] = useState(new Map());
  const [bricks] = useState(() => generateBricks(10, 15));
  const [monsters, setMonsters] = useState([
    new ForkMonster('monster1', 'Monster 1', 5, 5),
    new GhostMonster('monster2', 'Monster 2', 10, 7),
  ]);
  const [keyBindings, setKeyBindings] = useState<KeyBindings>({});
  const [playerOneBombActive, setPlayerOneBombActive] = useState(false);
  const [playerTwoBombActive, setPlayerTwoBombActive] = useState(false);
  const [playerThreeBombActive, setPlayerThreeBombActive] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModifyingControls, setIsModifyingControls] = useState(false);

  useEffect(() => {
    const storedBindings = localStorage.getItem('playerKeyBindings');
    if (storedBindings) {
      const parsedBindings = JSON.parse(storedBindings);
      setKeyBindings(parsedBindings);
    }
  }, []);

  const dropBomb = useCallback((x: number, y: number, playerNumber: number) => {
    const bombId = `${x}-${y}`;
    const currentBombs = playerNumber === 1 ? new Map(playerOneBombs) : new Map(playerTwoBombs);

    if (!currentBombs.has(bombId)
      && ((playerNumber === 1 && !playerOneBombActive)
    || (playerNumber === 2 && !playerTwoBombActive)
    || (playerNumber === 3 && !playerThreeBombActive))) {
      currentBombs.set(bombId, 3);
      if (playerNumber === 1) {
        setPlayerOneBombs(currentBombs);
        setPlayerOneBombActive(true);
      } else if (playerNumber === 2) {
        setPlayerTwoBombs(currentBombs);
        setPlayerTwoBombActive(true);
      } else {
        setPlayerThreeBombs(currentBombs);
        setPlayerThreeBombActive(true);
      }

      const interval = setInterval(() => {
        currentBombs.set(bombId, currentBombs.get(bombId) - 1);
        if (currentBombs.get(bombId) <= 0) {
          currentBombs.delete(bombId);
          clearInterval(interval);

          if (playerNumber === 1) {
            setPlayerOneBombActive(false);
          } else if (playerNumber === 2) {
            setPlayerTwoBombActive(false);
          } else {
            setPlayerThreeBombActive(false);
          }
        }
        if (playerNumber === 1) {
          setPlayerOneBombs(new Map(currentBombs));
        } else if (playerNumber === 2) {
          setPlayerTwoBombs(new Map(currentBombs));
        } else {
          setPlayerThreeBombs(new Map(currentBombs));
        }
      }, 1000);
    }
  }, [playerOneBombs, playerTwoBombs,
    playerOneBombActive, playerTwoBombActive, playerThreeBombActive]);

  const moveMonsters = useCallback(() => {
    setMonsters((currentMonsters) => currentMonsters.map((monster) => {
      const players = [player, playerTwo];
      if (numOfPlayers === '3' && playerThree) {
        players.push(playerThree);
      }
      const result = monster.move(bricks, players);
      return result;
    }));
  }, [bricks]);

  const checkPlayerCollision = useCallback((
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
      checkPlayerCollision(player, playerTwo, monsters, playerThree);
    } else {
      checkPlayerCollision(player, playerTwo, monsters, null);
    }
  }, [player, playerTwo, monsters, checkPlayerCollision, playerThree, numOfPlayers]);

  useEffect(() => {
    if (isPaused) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const playerOneEnemies = [playerTwo, playerThree].filter((p): p is Player => p !== null);
      const playerTwoEnemies = [player, playerThree].filter((p): p is Player => p !== null);
      const playerThreeEnemies = [player, playerTwo];

      const playerActions = {
        [keyBindings['1'][0]]: () => player.move('up', bricks, playerOneBombs, playerOneEnemies),
        [keyBindings['1'][1]]: () => player.move('left', bricks, playerOneBombs, playerOneEnemies),
        [keyBindings['1'][2]]: () => player.move('down', bricks, playerOneBombs, playerOneEnemies),
        [keyBindings['1'][3]]: () => player.move('right', bricks, playerOneBombs, playerOneEnemies),
        [keyBindings['1'][4]]: () => { dropBomb(player.getY(), player.getX(), 1); return player; },
        [keyBindings['2'][0]]: () => playerTwo.move('up', bricks, playerTwoBombs, playerTwoEnemies),
        [keyBindings['2'][1]]: () => playerTwo.move('left', bricks, playerTwoBombs, playerTwoEnemies),
        [keyBindings['2'][2]]: () => playerTwo.move('down', bricks, playerTwoBombs, playerTwoEnemies),
        [keyBindings['2'][3]]: () => playerTwo.move('right', bricks, playerTwoBombs, playerTwoEnemies),
        [keyBindings['2'][4]]: () => { dropBomb(playerTwo.getY(), playerTwo.getX(), 2); return playerTwo; },
      };

      if (playerThree) {
        playerActions[keyBindings['3'][0]] = () => playerThree?.move('up', bricks, playerThreeBombs, playerThreeEnemies);
        playerActions[keyBindings['3'][1]] = () => playerThree?.move('left', bricks, playerThreeBombs, playerThreeEnemies);
        playerActions[keyBindings['3'][2]] = () => playerThree?.move('down', bricks, playerThreeBombs, playerThreeEnemies);
        playerActions[keyBindings['3'][3]] = () => playerThree?.move('right', bricks, playerThreeBombs, playerThreeEnemies);
        playerActions[keyBindings['3'][4]] = () => { dropBomb(playerThree?.getY(), playerThree?.getX(), 3); return playerThree; };
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
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, playerTwo, playerThree, keyBindings, bricks, dropBomb,
    playerOneBombs, playerTwoBombs, playerThreeBombs, isPaused]);

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

    setPlayerOneBombs(new Map());
    setPlayerTwoBombs(new Map());

    setMonsters([
      new Monster('monster1', 'Monster 1', 5, 5),
      new Monster('monster2', 'Monster 2', 10, 7),
    ]);
    setIsSettingsOpen(false);

    setIsPaused(false);
  };

  const handleOpenModifyControls = () => {
    setIsModifyingControls(true);
    setIsPaused(true);
  };

  const saveAndCloseModifyControls = () => {
    setIsModifyingControls(false);
    setIsPaused(false);
  };

  const renderModifyControlsUI = () => {
    if (!isModifyingControls) return null;

    return (
      <StyledDialog
        open={isModifyingControls}
        onClose={() => setIsModifyingControls(false)}
        aria-labelledby="modify-controls-title"
        style={{ zIndex: 2100 }} // Ensure this dialog is on top of everything else
      >
        <DialogTitle id="modify-controls-title">Modify Controls</DialogTitle>
        <DialogContent dividers>
          {Object.keys(keyBindings).map((player) => (
            <PlayerControlsRow key={`player-${player}-controls`} numOfPlayers={String(numOfPlayers)}>
              <ControlsLabel>{`Player ${player} Controls:`}</ControlsLabel>
              <KeyGroup>
                {/* Custom layout for "W" above "S" and others horizontally */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <KeyConfigInput
                    value={arrowKeySymbols[keyBindings[player][0]]
                      || keyBindings[player][0].toUpperCase()}
                    readOnly
                  />
                  <div style={{ display: 'flex' }}>
                    <KeyConfigInput
                      value={arrowKeySymbols[keyBindings[player][1]]
                        || keyBindings[player][1].toUpperCase()}
                      readOnly
                    />
                    <KeyConfigInput
                      value={arrowKeySymbols[keyBindings[player][2]]
                        || keyBindings[player][2].toUpperCase()}
                      readOnly
                    />
                    <KeyConfigInput
                      value={arrowKeySymbols[keyBindings[player][3]]
                        || keyBindings[player][3].toUpperCase()}
                      readOnly
                    />
                  </div>
                </div>
                <ExtraKeys>
                  <KeyConfigInput
                    value={arrowKeySymbols[keyBindings[player][4]]
                      || keyBindings[player][4].toUpperCase()}
                    readOnly
                  />
                  <KeyConfigInput
                    value={arrowKeySymbols[keyBindings[player][5]]
                      || keyBindings[player][5].toUpperCase()}
                    readOnly
                  />
                </ExtraKeys>
              </KeyGroup>
            </PlayerControlsRow>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={saveAndCloseModifyControls} color="primary">
            Save
          </Button>
        </DialogActions>
      </StyledDialog>
    );
  };

  const renderCellsAndPlayer = () => Array.from({ length: 150 }, (_, index) => {
    const row = Math.floor(index / 15) + 1;
    const column = (index % 15) + 1;
    const isPlayerCell = player.getX() === column && player.getY() === row;
    const isPlayerTwoCell = playerTwo.getX() === column && playerTwo.getY() === row;
    const isPlayerThreeCell = playerThree
    && playerThree.getX() === column && playerThree.getY() === row;
    const isMonsterCell = monsters.some((monster) => monster.getX() === column
    && monster.getY() === row);
    const isWallCell = row === 1 || row === 10 || column === 1 || column === 15;
    const isBrickCell = bricks.has(`${row}-${column}`);
    const isBombCell = playerOneBombs.has(`${row}-${column}`) || playerTwoBombs.has(`${row}-${column}`);

    return (
      <GridCell key={index} isWall={isWallCell}>
        {isWallCell && (
        <img src={wall} alt="Wall" style={{ width: '100%', height: '100%' }} />
        )}
        {isBrickCell && (
        <img src={brick} alt="Brick" style={{ width: '100%', height: '100%' }} />
        )}
        {isPlayerCell && (
        <CharacterContainer>
          <img src={bombermanPlayer} alt="Player" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </CharacterContainer>
        )}
        {isPlayerTwoCell && (
        <CharacterContainer>
          <img src={bombermanPlayer} alt="Player 2" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </CharacterContainer>
        )}
        {isPlayerThreeCell && (
        <CharacterContainer>
          <img src={bombermanPlayer} alt="Player 3" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </CharacterContainer>
        )}
        {isMonsterCell && (
          <CharacterContainer>
            <img src={monster} alt="Monster" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </CharacterContainer>
        )}
        {isBombCell && (
          <img src={bomb} alt="Bomb" style={{ width: '100%', height: '100%' }} />
        )}
      </GridCell>
    );
  });

  return (
    <StyledBackground>
      <StyledSettingsButton onClick={handleOpenSettings}>
        <SettingsIcon />
      </StyledSettingsButton>
      <StyledGameDialog open>
        <Grid container spacing={2}>
          <Grid item xs={2} sx={{ mt: 5 }}>
            <PlayerStatus
              playerName={playerName}
              numBombs={numBombs}
              powers={powers}
              numObstacles={numObstacles}
              index={1}
            />
            {numOfPlayers === '3' && (
            <>
              <br />
              <PlayerStatus playerName="Player Two" numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={2} />
            </>
            )}
          </Grid>
          <Grid item xs={8}>
            <Paper>
              <MapContainer>
                <MyGrid>
                  {renderCellsAndPlayer()}
                </MyGrid>
              </MapContainer>
            </Paper>
          </Grid>
          <Grid item xs={2} sx={{ mt: numOfPlayers === '3' ? 15 : 5 }}>
            {numOfPlayers === '2' && <PlayerStatus playerName="Player Two" numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={2} />}
            {numOfPlayers === '3' && <PlayerStatus playerName="Player Three" numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={3} />}
          </Grid>
        </Grid>
      </StyledGameDialog>
      <SettingsScreen
        open={isSettingsOpen}
        onClose={handleCloseSettings}
        onRestart={handleRestartGame}
        onModifyControls={handleOpenModifyControls}
      />
      {renderModifyControlsUI()}
    </StyledBackground>
  );
};
