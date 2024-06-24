import React, { useEffect, useState } from 'react';
import ContainerHeader from "../Library/Container";
import WinLose from "../WinLose/WinLose";

const Sudoku = () => {
    const gameName = "Sudoku";
    const winMessage = "Sudoku";
    const loseMessage = "Sudoku";
    const height = 9;
    const width = 9;
    const [gameFinished, setGameFinished] = useState(false);
    const [sudoku, setSudoku] = useState([]);

    useEffect(() => {
        initComponent();
    }, []);

    function initComponent() {
        let matrix = generateStructure();
        matrix = generateSudoku(matrix);
        console.log(matrix);
        setSudoku(matrix);
    }

    function generateSudoku(matrix) {
        let [emRow, emCell] = findEmptyCell(matrix);
        console.log(emRow);
        console.log(emCell);
        if (emRow === null) {
            return true;
        }
        matrix[emRow][emCell] = 1;

        if (generateSudoku(matrix)) {
            return true;
        }

        return false;
    }

    function generateStructure() {
        let matrix = [];
        let emptyRow = [];
        for (let x = 0; x < width; x++) {
            emptyRow.push(0);
        }

        for (let y = 0; y < height; y++) {
            matrix.push(emptyRow);
        }

        console.log(matrix);
        return matrix;
    }

    function findEmptyCell(matrix) {
        // console.log(matrix);
        for (let y = 0; y < matrix.length; y++) {
            const row = matrix[y];
            for (let x = 0; x < row.length; x++) {
                const col = row[x];
                if (col === 0) {
                    return [y, x];
                }
            }
        }
        return [null, null];
    }

    function isNumberValid() {

    }

    return (
        <div className="container sudoku-container">
            {gameFinished && <WinLose isWin={true} winMessage={winMessage} loseMessage={loseMessage} restartGame={initComponent} />}
            <ContainerHeader title={gameName} restartGame={initComponent} />
            <button type="button" class="btn btn-primary" onClick={initComponent}>initComponent()</button>
            {sudoku.map((row, rowIndex) => (
                <div className="sudoku-row" key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <div className="sudoku-cell" key={cellIndex}>{cell}</div>
                    ))}
                </div>
            ))}


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