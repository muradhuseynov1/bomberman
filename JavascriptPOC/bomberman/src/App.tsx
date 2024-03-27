import React from "react";
import { WelcomeScreen } from "./components/WelcomeScreen/WelcomeScreen";
import './App.css';

function App() {
  const handleStart = () => {
    console.log('Start button clicked');
  };
  return (
    <div>
      <WelcomeScreen onStart={handleStart} />
    </div>
  );
}

export default App;
