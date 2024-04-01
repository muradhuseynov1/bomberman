import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/InstructionsTheme';
import './App.css';
import GameScreen from "./view/GameScreen/GameScreen";
import { WelcomeScreen } from "./view/WelcomeScreen/WelcomeScreen";
import { ConfigScreen } from "./view/ConfigScreen/ConfigScreen";
import { InstructionsScreen } from "./view/InstructionsScreen/InstructionsScreen";

function App() {
  const handleQuit = () => {
    console.log('Quit game');
    // Here you might want to navigate back to the WelcomeScreen or ConfigScreen
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<WelcomeScreen onStart={() => console.log('Game started!')} />} />
        <Route path="/config" element={<ConfigScreen />} />
        <Route path="/instructions" element={<InstructionsScreen />} />
        <Route path="/game" element={
          <GameScreen
            playerName="Player One"
            onQuit={handleQuit}
            numBombs={4}
            powers={['Detonator', 'RollerSkate']}
            numObstacles={4}
          />
        } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
