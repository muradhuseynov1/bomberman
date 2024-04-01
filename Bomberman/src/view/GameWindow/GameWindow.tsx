import React from 'react';
import { PlayerStatus, Power } from './PlayerStatusScreen/PlayerStatusScreen';

interface GamePanelProps {
  // Define any props needed for the game panel
}

export const GameWindow: React.FC<GamePanelProps> = () => {
  // Define game state or any logic here

  // Dummy data for players
  const players = [
    {
      name: 'Player 1',
      numBombs: 3,
      powers: [],
      numObstacles: 0
    },
    {
      name: 'Player 2',
      numBombs: 2,
      powers: [],
      numObstacles: 0
    }
  ];

  return (
    <div className="game-panel">
      {/* Main game panel component */}
      <div className="main-game-panel">
        {/* Render your main game panel here */}
        {/* Example: <MainGamePanel /> */}
        <p>Main Game Panel</p>
      </div>
      
      {/* Player status components */}
      <div className="player-status">
        {players.map((player, index) => (
          <PlayerStatus key={index} playerName={player.name} numBombs={player.numBombs} powers={player.powers} numObstacles={player.numObstacles} />
        ))}
      </div>
    </div>
  );
};

