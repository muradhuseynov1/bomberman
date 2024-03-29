import React from "react";
import { Routes, Route } from "react-router-dom";
import { WelcomeScreen } from "./components/WelcomeScreen/WelcomeScreen";
import { ConfigScreen } from "./components/ConfigScreen/ConfigScreen";
import './App.css';
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen onStart={() => console.log('Game started!')} />} />
      <Route path="/config" element={<ConfigScreen />} />
    </Routes>
  );
}
 
export default App;