import React, { useEffect, useState } from 'react';
import ContainerHeader from "../Library/Container";
import WinLose from "../WinLose/WinLose";

const Sudoku = () => {
    const gameName = "Sudoku";
    const winMessage = "Sudoku";
    const loseMessage = "Sudoku";
    const [gameFinished, setGameFinished] = useState(false);

    function initComponent() {

    }

    return (
        <div className="container sudoku-container">
            {gameFinished && <WinLose isWin={true} winMessage={winMessage} loseMessage={loseMessage} restartGame={initComponent} />}
            <ContainerHeader title={gameName} restartGame={initComponent} />


            {/* debug */}
            {/* <div className='sudoku-debug'>
                <p> - - - - Debug - - - - </p>
                <p>currentWord: {currentWord}</p>
                <p>currentWordArray: {currentWordArray.join(', ')}</p>
                <p>revealedLetters: {revealedLetters.join(', ')}</p>
                <p>incorrect: {incorrect}</p>
                <p>gameFinished: {gameFinished ? "Yes" : "No"}</p>
            </div> */}
        </div>
    );
}

export default Sudoku;