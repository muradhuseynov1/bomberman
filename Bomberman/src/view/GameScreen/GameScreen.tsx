import React, { useState, useEffect, useCallback } from 'react';
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
import { Paper, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Player } from '../../model/player';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import { generateBricks } from '../../helpers/generateBricks';
import bombermanPlayer from '../../assets/player-image.png';
import wall from '../../assets/wall.jpeg';
import brick from '../../assets/brick.jpeg';
import monster from '../../assets/monster.png';
import bomb from '../../assets/bomb.png';
import { useParams } from 'react-router-dom';
import { ControlsLabel, ExtraKeys, KeyConfigInput, KeyGroup, PlayerControlsRow, StyledDialog } from '../ConfigScreen/ConfigScreen.styles';
import { GameScreenProps, KeyBindings, arrowKeySymbols } from '../../constants/props';
import { Monster } from '../../model/monster';

export const GameScreen = ({
  playerName,
  numBombs = 4,
  powers = [],
  numObstacles = 4,
}: GameScreenProps) => {
  const { numOfPlayers } = useParams();
  const [player, setPlayer] = useState(new Player('player1', playerName, 2, 2));
  const [playerTwo, setPlayerTwo] = useState(new Player('player2', 'Player 2', 14, 9));
  const [playerThree, setPlayerThree] = useState(numOfPlayers === '3' ? new Player('player3', 'Player 3', 7, 7) : null);
  const [playerOneBombs, setPlayerOneBombs] = useState(new Map());
  const [playerTwoBombs, setPlayerTwoBombs] = useState(new Map());
  const [playerThreeBombs, setPlayerThreeBombs] = useState(new Map());
  const [bricks] = useState(() => generateBricks(10, 15));
  const [monsters, setMonsters] = useState([
    new Monster('monster1', 'Monster 1', 5, 5),
    new Monster('monster2', 'Monster 2', 10, 7),
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
    let currentBombs = playerNumber === 1 ? new Map(playerOneBombs) : new Map(playerTwoBombs);

    if (!currentBombs.has(bombId) && ((playerNumber === 1 && !playerOneBombActive) || (playerNumber === 2 && !playerTwoBombActive) || (playerNumber === 3 && !playerThreeBombActive))) {
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
  }, [playerOneBombs, playerTwoBombs, playerOneBombActive, playerTwoBombActive, playerThreeBombActive]);

  // TODO: monster should not be a Player object, but a Monster object.
  // TODO: Later change the Player object to a Monster object.
  const moveMonster = useCallback((monster: Monster) => {
    let newX = monster.getX();
    let newY = monster.getY();
    let possibleDirections = [1, 2, 3, 4];
  
    possibleDirections = possibleDirections.filter(direction => {
      switch (direction) {
        case 1:
          return newY > 2 && !bricks.has(`${newY - 1}-${newX}`) && !(newX === 1 || newX === 15);
        case 2:
          return newX < 14 && !bricks.has(`${newY}-${newX + 1}`) && !(newY === 1 || newY === 10);
        case 3:
          return newY < 9 && !bricks.has(`${newY + 1}-${newX}`) && !(newX === 1 || newX === 15);
        case 4:
          return newX > 2 && !bricks.has(`${newY}-${newX - 1}`) && !(newY === 1 || newY === 10);
        default:
          return false;
      }
    });
  
    if (possibleDirections.length > 0) {
      const direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
  
      switch (direction) {
        case 1: newY--; break;
        case 2: newX++; break;
        case 3: newY++; break;
        case 4: newX--; break;
      }
    }
  
    if ((newX === 2 && newY === 2) || (newX === 14 && newY === 9)) {
      return monster;
    }
  
    return new Player(monster.getId(), monster.getName(), newX, newY);
  }, [bricks]);

  const checkPlayerCollision = useCallback((currentPlayer: Player, currentPlayerTwo: Player, currentMonsters: Monster[], currentPlayerThree: Player | null) => {
    currentMonsters.forEach(monster => {
      if (monster.getX() === currentPlayer.getX() && monster.getY() === currentPlayer.getY()) {
        setPlayer(prev => new Player(prev.getId(), prev.getName(), 2, 2));
      }
      if (monster.getX() === currentPlayerTwo.getX() && monster.getY() === currentPlayerTwo.getY()) {
        setPlayerTwo(prev => new Player(prev.getId(), prev.getName(), 14, 9));
      }
      if (currentPlayerThree && monster.getX() === currentPlayerThree.getX() && monster.getY() === currentPlayerThree.getY()) {
        setPlayerThree(prev => (prev ? new Player(prev.getId(), prev.getName(), 7, 7) : null));
      }
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setMonsters(currentMonsters => currentMonsters.map(monster => moveMonster(monster) || monster));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [moveMonster, isPaused]);

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
      let newX1 = player.getX();
      let newY1 = player.getY();
      let newX2 = playerTwo.getX();
      let newY2 = playerTwo.getY();

      const playerOneBindings = keyBindings['1'] || [];
      const playerTwoBindings = keyBindings['2'] || [];

      if (playerOneBindings.includes(event.key)) {
        switch (event.key) {
          case playerOneBindings[0]: // Up
            newY1 = (newY1 > 2 && !bricks.has(`${newY1 - 1}-${newX1}`) && !(newY1 - 1 === newY2 && newX1 === newX2)) && !playerOneBombs.has(`${newY1 - 1}-${newX1}`) && !playerTwoBombs.has(`${newY1 - 1}-${newX1}`) ? newY1 - 1 : newY1;
            break;
          case playerOneBindings[1]: // Left
            newX1 = (newX1 > 2 && !bricks.has(`${newY1}-${newX1 - 1}`) && !(newY1 === newY2 && newX1 - 1 === newX2)) && !playerOneBombs.has(`${newY1}-${newX1 - 1}`) && !playerTwoBombs.has(`${newY1}-${newX1 - 1}`) ? newX1 - 1 : newX1;
            break;
          case playerOneBindings[2]: // Downw
            newY1 = (newY1 < 9 && !bricks.has(`${newY1 + 1}-${newX1}`) && !(newY1 + 1 === newY2 && newX1 === newX2)) && !playerOneBombs.has(`${newY1 + 1}-${newX1}`) && !playerTwoBombs.has(`${newY1 + 1}-${newX1}`) ? newY1 + 1 : newY1;
            break;
          case playerOneBindings[3]: // Right
            newX1 = (newX1 < 14 && !bricks.has(`${newY1}-${newX1 + 1}`) && !(newY1 === newY2 && newX1 + 1 === newX2)) && !playerOneBombs.has(`${newY1}-${newX1 + 1}`) && !playerTwoBombs.has(`${newY1}-${newX1 + 1}`) ? newX1 + 1 : newX1;
            break;
          case playerOneBindings[4]: // Drop bomb
            dropBomb(newY1, newX1, 1);
            break;
        }
      }

      if (playerTwoBindings.includes(event.key)) {
        switch (event.key) {
          case playerTwoBindings[0]: // Up
            newY2 = (newY2 > 2 && !bricks.has(`${newY2 - 1}-${newX2}`) && !(newY2 - 1 === newY1 && newX2 === newX1)) && !playerOneBombs.has(`${newY2 - 1}-${newX2}`) && !playerTwoBombs.has(`${newY2 - 1}-${newX2}`) ? newY2 - 1 : newY2;
            break;
          case playerTwoBindings[1]: // Left
            newX2 = (newX2 > 2 && !bricks.has(`${newY2}-${newX2 - 1}`) && !(newY2 === newY1 && newX2 - 1 === newX1)) && !playerOneBombs.has(`${newY2}-${newX2 - 1}`) && !playerTwoBombs.has(`${newY2}-${newX2 - 1}`) ? newX2 - 1 : newX2;
            break;
          case playerTwoBindings[2]: // Down
            newY2 = (newY2 < 9 && !bricks.has(`${newY2 + 1}-${newX2}`) && !(newY2 + 1 === newY1 && newX2 === newX1)) && !playerOneBombs.has(`${newY2 + 1}-${newX2}`) && !playerTwoBombs.has(`${newY2 + 1}-${newX2}`) ? newY2 + 1 : newY2;
            break;
          case playerTwoBindings[3]: // Right
            newX2 = (newX2 < 14 && !bricks.has(`${newY2}-${newX2 + 1}`) && !(newY2 === newY1 && newX2 + 1 === newX1)) && !playerOneBombs.has(`${newY2}-${newX2 + 1}`) && !playerTwoBombs.has(`${newY2}-${newX2 + 1}`) ? newX2 + 1 : newX2;
            break;
          case playerTwoBindings[4]: // Drop bomb
            dropBomb(newY2, newX2, 2);
            break;
        }
      }
      if (numOfPlayers === '3' && playerThree) {
        let newX3 = playerThree.getX();
        let newY3 = playerThree.getY();
        const playerThreeBindings = keyBindings['3'] || [];

        if (playerThreeBindings.includes(event.key)) {
          switch (event.key) {
            case playerThreeBindings[0]: // Up
              newY3 = (newY3 > 2 && !bricks.has(`${newY3 - 1}-${newX3}`) && !(newY3 - 1 === newY1 && newX3 === newX1) && !(newY3 - 1 === newY2 && newX3 === newX2)) && !playerOneBombs.has(`${newY3 - 1}-${newX3}`) && !playerTwoBombs.has(`${newY3 - 1}-${newX3}`) && !playerThreeBombs.has(`${newY3 - 1}-${newX3}`) ? newY3 - 1 : newY3;
              break;
            case playerThreeBindings[1]: // Left
              newX3 = (newX3 > 2 && !bricks.has(`${newY3}-${newX3 - 1}`) && !(newY3 === newY1 && newX3 - 1 === newX1) && !(newY3 === newY2 && newX3 - 1 === newX2)) && !playerOneBombs.has(`${newY3}-${newX3 - 1}`) && !playerTwoBombs.has(`${newY3}-${newX3 - 1}`) && !playerThreeBombs.has(`${newY3}-${newX3 - 1}`) ? newX3 - 1 : newX3;
              break;
            case playerThreeBindings[2]: // Down
              newY3 = (newY3 < 9 && !bricks.has(`${newY3 + 1}-${newX3}`) && !(newY3 + 1 === newY1 && newX3 === newX1) && !(newY3 + 1 === newY2 && newX3 === newX2)) && !playerOneBombs.has(`${newY3 + 1}-${newX3}`) && !playerTwoBombs.has(`${newY3 + 1}-${newX3}`) && !playerThreeBombs.has(`${newY3 + 1}-${newX3}`) ? newY3 + 1 : newY3;
              break;
            case playerThreeBindings[3]: // Right
              newX3 = (newX3 < 14 && !bricks.has(`${newY3}-${newX3 + 1}`) && !(newY3 === newY1 && newX3 + 1 === newX1) && !(newY3 === newY2 && newX3 + 1 === newX2)) && !playerOneBombs.has(`${newY3}-${newX3 + 1}`) && !playerTwoBombs.has(`${newY3}-${newX3 + 1}`) && !playerThreeBombs.has(`${newY3}-${newX3 + 1}`) ? newX3 + 1 : newX3;
              break;
            case playerThreeBindings[4]: // Drop bomb
              dropBomb(newY3, newX3, 3);
            break;
          }
          if (newX3 !== playerThree.getX() || newY3 !== playerThree.getY()) {
            setPlayerThree(new Player(playerThree.getId(), playerThree.getName(), newX3, newY3));
          }
        }
      }
      if (newX1 !== player.getX() || newY1 !== player.getY()) {
        setPlayer(new Player(player.getId(), player.getName(), newX1, newY1));
      }
      if (newX2 !== playerTwo.getX() || newY2 !== playerTwo.getY()) {
        setPlayerTwo(new Player(playerTwo.getId(), playerTwo.getName(), newX2, newY2));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, playerTwo, keyBindings, bricks, dropBomb, playerOneBombs, playerTwoBombs, playerThreeBombs, playerThree, numOfPlayers, isPaused]);

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    setIsPaused(true);
  };
  
  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    setIsPaused(false);
  };  

  const handleRestartGame = () => {
    // Reset player positions
    setPlayer(new Player('player1', playerName, 2, 2));
    setPlayerTwo(new Player('player2', 'Player 2', 14, 9));
  
    // Reset bomb states
    setPlayerOneBombs(new Map());
    setPlayerTwoBombs(new Map());
  
    // Reset monster positions
    setMonsters([
      new Player('monster1', 'Monster 1', 5, 5),
      new Player('monster2', 'Monster 2', 10, 7),
    ]);
  
    // TODO: Reset the map (destroyed items)
  
    // Close the settings dialog if open
    setIsSettingsOpen(false);
  
    // Unpause the game if it was paused
    setIsPaused(false);
  
    console.log("Game restarted");
  };  
  
  const handleOpenModifyControls = () => {
    setIsModifyingControls(true);
    setIsPaused(true); 
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
                    value={arrowKeySymbols[keyBindings[player][0]] || keyBindings[player][0].toUpperCase()}
                    readOnly
                  />
                  <div style={{ display: 'flex' }}>
                    <KeyConfigInput
                      value={arrowKeySymbols[keyBindings[player][1]] || keyBindings[player][1].toUpperCase()}
                      readOnly
                    />
                    <KeyConfigInput
                      value={arrowKeySymbols[keyBindings[player][2]] || keyBindings[player][2].toUpperCase()}
                      readOnly
                    />
                    <KeyConfigInput
                      value={arrowKeySymbols[keyBindings[player][3]] || keyBindings[player][3].toUpperCase()}
                      readOnly
                    />
                  </div>
                </div>
                <ExtraKeys>
                  <KeyConfigInput
                    value={arrowKeySymbols[keyBindings[player][4]] || keyBindings[player][4].toUpperCase()}
                    readOnly
                  />
                  <KeyConfigInput
                    value={arrowKeySymbols[keyBindings[player][5]] || keyBindings[player][5].toUpperCase()}
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

  const saveAndCloseModifyControls = () => {
    setIsModifyingControls(false);
    setIsPaused(false); 
  };  

  const renderCellsAndPlayer = () => {
    return Array.from({ length: 150 }, (_, index) => {
      const row = Math.floor(index / 15) + 1;
      const column = (index % 15) + 1;
      const isPlayerCell = player.getX() === column && player.getY() === row;
      const isPlayerTwoCell = playerTwo.getX() === column && playerTwo.getY() === row;
      const isPlayerThreeCell = playerThree && playerThree.getX() === column && playerThree.getY() === row;
      const isMonsterCell = monsters.some(monster => monster.getX() === column && monster.getY() === row);
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
  };

  return (
    <StyledBackground>
      <StyledSettingsButton onClick={handleOpenSettings}>
        <SettingsIcon />
      </StyledSettingsButton>
      <StyledGameDialog open={true}>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{mt: 5}}>
          <PlayerStatus playerName={playerName} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={1} />
          {numOfPlayers === '3' && (
            <>
              <br/>
              <PlayerStatus playerName={'Player Two'} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={2} />
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
        <Grid item xs={2} sx={{mt: numOfPlayers === '3' ? 15 : 5}}>
          {numOfPlayers === '2' && <PlayerStatus playerName={'Player Two'} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={2} />}
          {numOfPlayers === '3' && <PlayerStatus playerName={'Player Three'} numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={3} />}
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
