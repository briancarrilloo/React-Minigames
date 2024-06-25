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
    const [visibleSudoku, setVisibleSudoku] = useState([]);
    const [enabledMap, setEnabledMap] = useState([]);

    useEffect(() => {
        initComponent();
    }, []);

    function initComponent() {
        let emptyMatrix = generateStructure(0);
        generateSudoku(emptyMatrix);
    }

    function generateSudoku(matrix) {
        let [emRow, emCell] = findEmptyCell(matrix);
        if (emRow === null) {
            // console.log(matrix);
            setSudoku(matrix);
            setVisibleSudoku(hideSudoku(matrix));
            return true;
        }

        let initialNumber = getRandom(1, 9);
        let number = initialNumber;
        for (let i = 0; i < 10; i++) {
            if (number > 9) {
                number = 1;
            }
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

    function generateStructure(content) {
        let matrix = [];
        for (let y = 0; y < height; y++) {
            let emptyRow = [];
            for (let x = 0; x < width; x++) {
                emptyRow.push(content);
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
        // Row does not contain number
        for (let x = 0; x < matrix[row].length; x++) {
            const cell = matrix[row][x];
            if (cell === number) {
                return false;
            }
        }
        // Col does not contain number
        for (let y = 0; y < matrix[col].length; y++) {
            const cell = matrix[y][col];
            if (cell === number) {
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
        let startSubgridY = Math.floor(row / 3) * 3;
        let endSubgridY = startSubgridY + 3;
        let startSubgridX = Math.floor(col / 3) * 3;
        let endSubgridX = startSubgridX + 3;

        for (let y = startSubgridY; y < endSubgridY; y++) {
            for (let x = startSubgridX; x < endSubgridX; x++) {
                const element = matrix[y][x];
                if (matrix[y][x] === number) {
                    // console.log(`Found number ${number} at ${y},${x}`);
                    return false;
                }
            }
        }

        return true;
    }

    function handleCellClick(number, row, col) {
        temporaryValidateSubgrid(number, sudoku, row, col);
    }

    function hideSudoku(matrix) {
        const hiddenCells = 35;
        const auxEnabledMap = generateStructure(false);
        const clonedMatrix = matrix.map(row => [...row]);

        let attempts = 0;
        while (attempts < hiddenCells) {
            let y = getRandom(0, 8);
            let x = getRandom(0, 8);
            if (clonedMatrix[y][x] !== 0) {
                let backup = clonedMatrix[y][x];
                clonedMatrix[y][x] = 0;
                if (hasUniqueSolution(clonedMatrix)) {
                    auxEnabledMap[y][x] = true;
                    attempts++;
                } else {
                    clonedMatrix[y][x] = backup;
                }
            }
        }

        setEnabledMap(auxEnabledMap);
        return clonedMatrix;
    }

    function hasUniqueSolution(matrix) {
        let solutionCount = 0;
        function solve(matrix) {
            let [row, col] = findEmptyCell(matrix);
            if (row === null) {
                solutionCount++;
                return solutionCount === 1;
            }

            for (let num = 1; num <= 9; num++) {
                if (isNumberValid(num, matrix, row, col)) {
                    matrix[row][col] = num;
                    if (solve(matrix)) return true;
                    matrix[row][col] = 0;
                }
            }
            return false;
        }

        let clonedMatrix = matrix.map(row => [...row]);
        solve(clonedMatrix);
        return solutionCount === 1;
    }

    function getCellHTML(rowIndex, cellIndex, cell) {
        let cssClass = "sudoku-cell";
        const cellEditable = enabledMap[rowIndex][cellIndex];
        if (cellEditable) {
            cssClass += " enabled";
        } else {
            cssClass += " disabled";
        }

        return (<div
            className={cssClass}
            key={cellIndex}
            contentEditable={cellEditable}>
            {cell != 0 && cell}
        </div>);
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div className="container sudoku-container">
            {gameFinished && <WinLose isWin={true} winMessage={winMessage} loseMessage={loseMessage} restartGame={initComponent} />}
            <ContainerHeader title={gameName} restartGame={initComponent} />
            <div className='sudoku'>
                {visibleSudoku.length > 0 && visibleSudoku.map((row, rowIndex) => (
                    <div className="sudoku-row" key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            getCellHTML(rowIndex, cellIndex, cell)
                        ))}
                    </div>
                ))}
            </div>

            {/* debug */}
            <div className='sudoku sudoku-debug'>
                <p> - - - - Debug - - - - </p>
                {sudoku.length > 0 && sudoku.map((row, rowIndex) => (
                    <div className="sudoku-row" key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <button className="sudoku-cell" key={cellIndex} onClick={() => handleCellClick(cell, rowIndex, cellIndex)}>{cell != 0 && cell}</button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sudoku;