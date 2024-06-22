import React from 'react';
import './GameSelector.css'
import '../Library/CSSLibrary.css'

const GameSelector = ({ selectGame }) => {
    return (
        <div className="container gameselector-container">
            <h1>Selector de minijuegos</h1>
            <div className="game-buttons">
                <button className="game-button" onClick={() => selectGame("Ahorcado")}>
                    <div className="game-icon">[Imagen]</div>
                    <div>Ahorcado</div>
                </button>
            </div>
        </div>

    );
}

export default GameSelector;
