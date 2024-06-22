import React from 'react';
import './GameSelector.css'
import '../Library/CSSLibrary.css'
import AhorcadoLogo from '../Ahorcado/img/Logo.jpg';
import { Link } from 'react-router-dom';

const GameSelector = () => {
    return (
        <div className="container gameselector-container">
            <h1>Selector de minijuegos</h1>
            <div className="game-buttons">
                <Link to={"/ahorcado"} className="game-button">
                    <div className="game-icon">
                        <img src={AhorcadoLogo} alt="Ahorcado" />
                    </div>
                    <div>Ahorcado</div>
                </Link>
            </div>
        </div>
    );
}

export default GameSelector;
