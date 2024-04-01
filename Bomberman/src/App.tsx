import React from "react";
import { Routes, Route } from "react-router-dom";
import { WelcomeScreen } from "./view/WelcomeScreen/WelcomeScreen";
import { ConfigScreen } from "./view/ConfigScreen/ConfigScreen";
import { GameWindow } from "./view/GameWindow/GameWindow";
import './App.css';
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen onStart={() => console.log('Game started!')} />} />
      <Route path="/config" element={<ConfigScreen />} />
      <Route path="/game-window" element={<GameWindow />} />
    </Routes>
  );
}
 
export default App;