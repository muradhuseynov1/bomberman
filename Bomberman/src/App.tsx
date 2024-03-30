import React from "react";
import { Routes, Route } from "react-router-dom";
import { WelcomeScreen } from "./view/WelcomeScreen/WelcomeScreen";
import { ConfigScreen } from "./view/ConfigScreen/ConfigScreen";
import './App.css';
import { InstructionsScreen } from "./view/InstructionsScreen/InstructionsScreen";
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen onStart={() => console.log('Game started!')} />} />
      <Route path="/config" element={<ConfigScreen />} />
      <Route path="/instructions" element={<InstructionsScreen />} />
    </Routes>
  );
}
 
export default App;