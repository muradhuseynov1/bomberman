// PlayerStatusScreen/PlayerStatusScreen.tsx
import React, { useState } from "react";
export type Power = 'Detonator' | 'RollerSkate' | 'Invincibility' | 'Ghost' | 'Obstacle';

interface PlayerStatusProps {
  playerName: string;
  numBombs: number;
  powers: Power[];
  numObstacles: number;
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({ playerName, numBombs, powers, numObstacles }) => {
  
  const getPowerIcon = (power: Power): React.ReactNode => {
      switch (power) {
        case 'Detonator':
          return <span>🧨</span>;
        case 'RollerSkate':
          return <span>👟</span>;
        case 'Invincibility':
          return <span>💪</span>;
        case 'Ghost':
          return <span>👻</span>;
        case 'Obstacle':
          return <span>🚧</span>;
        default:
          return null;
      }
    };

  return (
    <div className="player-status">
      <h2>{playerName}</h2>
      <p>Bombs: {numBombs}</p>
      <p>Power-Ups:</p>
      <ul>
        {powers.map((power, index) => (
          <li key={index}>{getPowerIcon(power)}</li>
        ))}
      </ul>
      <p>Obstacles: {numObstacles}</p>
    </div>
  );
};

export default PlayerStatus;
