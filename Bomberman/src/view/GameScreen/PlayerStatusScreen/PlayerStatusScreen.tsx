import React from "react";
import { PlayerStatusContainer, PlayerName, PowerUpsList, PowerUpItem, ObstaclesCount } from "./PlayerStatusScreen.style";
import { Typography } from "@mui/material";
import theme from "../../../theme/PlayerStatusTheme";

export type Power = 'Detonator' | 'RollerSkate' | 'Invincibility' | 'Ghost' | 'Obstacle';

interface PlayerStatusProps {
  playerName: string;
  numBombs: number;
  powers: Power[];
  numObstacles: number;
  index: number;
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({ playerName, numBombs, powers, numObstacles, index }) => {
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
    <PlayerStatusContainer theme={theme} index={index}>
      <PlayerName variant="h6">{playerName}</PlayerName>
      <Typography variant="body1">Bombs: {numBombs}</Typography>
      <PowerUpsList>
        {powers.map((power, index) => (
          <PowerUpItem key={index}>{getPowerIcon(power)}</PowerUpItem>
        ))}
      </PowerUpsList>
      <ObstaclesCount variant="body1">Obstacles: {numObstacles}</ObstaclesCount>
    </PlayerStatusContainer>
  );
};

export default PlayerStatus;
