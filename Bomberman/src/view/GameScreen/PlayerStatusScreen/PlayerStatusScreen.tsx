import React from "react";
import { PlayerStatusContainer, PlayerName, PowerUpsList, PowerUpItem, ObstaclesCount } from "./PlayerStatusScreen.styles";
import { Typography } from "@mui/material";
import theme from "../../../theme/PlayerStatusTheme";
import { PlayerStatusProps, Power } from "../../../constants/props";

export const PlayerStatus = ({ playerName, numBombs, powers, numObstacles, index }: PlayerStatusProps) => {
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
