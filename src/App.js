import React from 'react';
import './App.css';
import Ahorcado from "./components/Ahorcado/Ahorcado.js";
import GameSelector from "./components/GameSelector/GameSelector.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const RouteMap = [
  {
    "path": "",
    "component": <GameSelector />
  },
  {
    "path": "/ahorcado",
    "component": <Ahorcado />
  }
];

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {RouteMap.map((x, index) => (<Route key={index} path={x.path} element={React.cloneElement(x.component)} />))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
