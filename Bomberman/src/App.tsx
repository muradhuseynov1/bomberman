import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/InstructionsTheme';
import './App.css';
import { GameScreen } from './view/GameScreen/GameScreen';
import { WelcomeScreen } from './view/WelcomeScreen/WelcomeScreen';
import { ConfigScreen } from './view/ConfigScreen/ConfigScreen';
import { InstructionsScreen } from './view/InstructionsScreen/InstructionsScreen';
import { GameSettingsProvider } from './contexts/GameSettingsContext';

export function App() {
  return (
    <GameSettingsProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/config" element={<ConfigScreen />} />
          <Route path="/instructions" element={<InstructionsScreen />} />
          <Route
            path="/game/:numOfPlayers"
            element={(
              <GameScreen
                playerName="Player One"
                numBombs={4}
                powers={['Detonator', 'RollerSkate']}
                numObstacles={4}
              />
          )}
          />
        </Routes>
      </ThemeProvider>
    </GameSettingsProvider>
  );
}
