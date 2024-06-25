import React from 'react';
import './GameSelector.css'
import '../Library/Container.css'
import AhorcadoLogo from '../Ahorcado/img/Logo.jpg';
import SudokuLogo from '../Sudoku/img/Logo.png'
import { Link } from 'react-router-dom';

const GameMap = [
    {
        "name": "Ahorcado",
        "path": "/ahorcado",
        "logo": AhorcadoLogo
    },
    {
        "name": "Sudoku",
        "path": "/sudoku",
        "logo": SudokuLogo
    }
];

const GameSelector = () => {
    return (
        <div className="container gameselector-container">
            <h1>Selector de minijuegos</h1>
            <div className="game-buttons">
                {GameMap.map((x, index) => (
                    <Link key={index} to={x.path} className="game-button">
                        <div className="game-icon">
                            <img src={x.logo} alt={x.name} />
                        </div>
                        <div>{x.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default GameSelector;
