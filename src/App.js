import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import Ahorcado from "./components/Ahorcado/Ahorcado.js";
import GameSelector from "./components/GameSelector/GameSelector.js";

function App() {
  const [selectedGame, setSelectedGame] = useState('');

  const selectGame = (newGame) => {
    setSelectedGame(newGame);
  }

  function renderMinigame() {
    switch (selectedGame) {
      case "Ahorcado":
        return <Ahorcado selectGame={selectGame} />;
      default:
        return <GameSelector selectGame={selectGame} />;
    }
  }

  return (
    <div className="App">
      {renderMinigame()}
    </div>
  );
}

export default App;
