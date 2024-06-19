import React from 'react';

const GameSelector = ({ selectGame }) => {
    return (
        <div className="gameselector-container">
            <h1>Selector de juegos</h1>
            <button onClick={() => selectGame("Ahorcado")}>Ahorcado</button>
        </div>
    );
}

export default GameSelector;
