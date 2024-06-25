import React, { useEffect, useState } from 'react';
import ContainerHeader from "../Library/Container";
import WinLose from "../WinLose/WinLose";
import './Sudoku.css'

const Sudoku = () => {
    const gameName = "Sudoku";
    const winMessage = "Sudoku";
    const loseMessage = "Sudoku";
    const height = 9;
    const width = 9;
    const [gameFinished, setGameFinished] = useState(false);
    const [sudoku, setSudoku] = useState([]);

    // useEffect(() => {
    //     initComponent();
    // }, []);

    function initComponent() {
        let emptyMatrix = generateStructure();
        generateSudoku(emptyMatrix);
    }

    function generateSudoku(matrix) {
        let [emRow, emCell] = findEmptyCell(matrix);
        if (emRow === null) {
            console.log(matrix);
            setSudoku(matrix)
            return true;
        }

        for (let number = 1; number <= 9; number++) {
            // TODO: Randomize number selection
            if (isNumberValid(number, matrix, emRow, emCell)) {
                matrix[emRow][emCell] = number;

                if (generateSudoku(matrix)) {
                    return true;
                }

                matrix[emRow][emCell] = 0;
            }
        }

        return false;
    }

    function generateStructure() {
        let matrix = [];
        for (let y = 0; y < height; y++) {
            let emptyRow = [];
            for (let x = 0; x < width; x++) {
                emptyRow.push(0);
            }
            matrix.push(emptyRow);
        }

        return matrix;
    }

    function findEmptyCell(matrix) {
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


    function isNumberValid(number, matrix, row, col) {
        console.log(`Validating ${number} at ${row},${col}`);
        // Row does not contain number
        for (let x = 0; x < matrix[row].length; x++) {
            const cell = matrix[row][x];
            if (cell === number) {
                console.log('Found at row');
                return false;
            }
        }
        // Col does not contain number
        for (let y = 0; y < matrix[col].length; y++) {
            const cell = matrix[y][col];
            if (cell === number) {
                console.log('Found at col');
                return false;
            }
        }
        // 3x3 grid does not contain number
        if (!temporaryValidateSubgrid(number, matrix, row, col)) {
            return false;
        }

        return true;
    }

    function temporaryValidateSubgrid(number, matrix, row, col) {
        console.log('Temporary Subgrid validation');
        let startSubgridY = Math.floor(row / 3) * 3;
        let endSubgridY = startSubgridY + 3;
        let startSubgridX = Math.floor(col / 3) * 3;
        let endSubgridX = startSubgridX + 3;

        for (let y = startSubgridY; y < endSubgridY; y++) {
            console.log('Check subgrid row: ' + y);
            for (let x = startSubgridX; x < endSubgridX; x++) {
                const element = matrix[y][x];
                console.log('Check subgrid column: ' + x);
                if (matrix[y][x] === number) {
                    console.log(`Found number ${number} at ${y},${x}`);
                    return false;
                }
            }
        }

        return true;
    }

    function handleCellClick(number, row, col) {
        temporaryValidateSubgrid(number, sudoku, row, col);
    }

    return (
        <div className="container sudoku-container">
            {gameFinished && <WinLose isWin={true} winMessage={winMessage} loseMessage={loseMessage} restartGame={initComponent} />}
            <ContainerHeader title={gameName} restartGame={initComponent} />
            <button type="button" className="btn btn-primary" onClick={initComponent}>initComponent()</button>
            <div className='sudoku'>
                {sudoku.length > 0 && sudoku.map((row, rowIndex) => (
                    <div className="sudoku-row" key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <button className="sudoku-cell" key={cellIndex} onClick={() => handleCellClick(cell, rowIndex, cellIndex)}>{cell}</button>
                        ))}
                    </div>
                ))}
            </div>

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