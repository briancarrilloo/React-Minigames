import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsArrowRepeat } from 'react-icons/bs';
import WinLose from '../WinLose/WinLose';
import './Ahorcado.css';
import wordDatabase from "./wordDatabase.json";
import zeroIncorrect from "./img/0.png";
import oneIncorrect from "./img/1.png";
import twoIncorrect from "./img/2.png";
import threeIncorrect from "./img/3.png";
import fourIncorrect from "./img/4.png";
import fiveIncorrect from "./img/5.png";

const Ahorcado = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [currentWordArray, setCurrentWordArray] = useState([]);
    const [revealedLetters, setRevealedLetters] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [incorrect, setIncorrect] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);

    const winMessage = "¡Has ganado!";
    const loseMessage = "Has perdido...";

    useEffect(() => {
        initComponent();
    }, []);

    function initComponent() {
        const randomWord = getRandomWord();
        setCurrentWord(randomWord);
        refreshWordArray(randomWord);
        setRevealedLetters([]);
        setGameFinished(false);
        setIncorrect(0); // Reset incorrect guesses
    }

    function refreshWordArray(word) {
        const wordArray = word.split('');
        let secretWordArray = [];

        wordArray.forEach(letter => {
            if (revealedLetters.includes(letter)) {
                secretWordArray.push(letter);
            } else {
                secretWordArray.push('_');
            }
        });
        setCurrentWordArray(secretWordArray);
    }

    function getRandomWord() {
        const words = wordDatabase.words;
        const randomWord = words[Math.floor(Math.random() * words.length)];
        return randomWord.toUpperCase();
    }

    function handleInputChange(event) {
        let input = event.target.value;
        if (input.length > 1) {
            return;
        }
        if (!isLetter(input)) {
            return;
        }
        setInputValue(input.toUpperCase());
    }

    function isLetter(string) {
        if (string.toLowerCase() === "ñ") {
            return true;
        }
        return /^[a-zA-Z]*$/.test(string);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newLetter = inputValue.toUpperCase();
        if (!revealedLetters.includes(newLetter)) {
            setRevealedLetters(prevRevealedLetters => [...prevRevealedLetters, newLetter]);
            if (!currentWord.includes(newLetter)) {
                setIncorrect(prevIncorrect => prevIncorrect + 1);
            }
        }
        setInputValue('');
    }

    useEffect(() => {
        CheckGameStatus();
    }, [incorrect, currentWordArray]);

    function CheckGameStatus() {
        // Losing
        if (incorrect >= 5) {
            setGameFinished(true);
        }

        // Winning
        const currentWordString = currentWordArray.join('');
        if (currentWord && currentWord === currentWordString) {
            setGameFinished(true);
        }
    }

    useEffect(() => {
        refreshWordArray(currentWord);
    }, [revealedLetters, currentWord]);

    function renderImage() {
        const imgAlt = "Imagen del juego del ahorcado";
        switch (incorrect) {
            case 0:
                return <img src={zeroIncorrect} alt={imgAlt} />;
            case 1:
                return <img src={oneIncorrect} alt={imgAlt} />;
            case 2:
                return <img src={twoIncorrect} alt={imgAlt} />;
            case 3:
                return <img src={threeIncorrect} alt={imgAlt} />;
            case 4:
                return <img src={fourIncorrect} alt={imgAlt} />;
            case 5:
                return <img src={fiveIncorrect} alt={imgAlt} />;
            default:
                return <img src={fiveIncorrect} alt={imgAlt} />;
        }
    }

    function renderWord() {
        if (gameFinished) {
            return (
                <div className="ahorcado-letras">
                    <p>La palabra era:</p>
                    {currentWordArray.map((letter, index) => (
                        <p key={index}>{letter}</p>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="ahorcado-letras">
                    {currentWordArray.map((letter, index) => (
                        <p key={index}>{letter}</p>
                    ))}
                </div>
            );
        }
    }

    return (
        <div className="container ahorcado-container">
            {gameFinished && <WinLose isWin={incorrect < 5} winMessage={winMessage} loseMessage={loseMessage} restartGame={initComponent} />}
            <div className="container-header">
                <Link to={"/"} className="btn button btn-dark d-flex align-items-center">
                    <BsArrowLeft className="arrow-icon" />
                </Link>
                <button className="btn btn-dark last-button d-flex align-items-center" onClick={initComponent}>
                    <BsArrowRepeat className="refresh-icon" />
                </button>
                <h1>El juego del ahorcado</h1>
            </div>
            {renderImage()}
            {!gameFinished &&
                <div className="ahorcado-letras">
                    {currentWordArray.map((letter, index) => (
                        <p key={index}>{letter}</p>
                    ))}
                </div>
            }
            {gameFinished &&
                <div className="ahorcado-letras">
                    <p>La palabra era:</p>
                    <p>{currentWord}</p>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <div className="ahorcado-input">
                    <input
                        type='text'
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Ingrese una letra"
                        disabled={gameFinished}
                    />
                    <button className="btn btn-primary" type="submit" disabled={gameFinished}>Enviar</button>
                </div>
            </form>
            <p>Letras intentadas: {revealedLetters.join(', ')}</p>

            {/* debug */}
            <div className='ahorcado-debug'>
                <p> - - - - Debug - - - - </p>
                <p>currentWord: {currentWord}</p>
                <p>currentWordArray: {currentWordArray.join(', ')}</p>
                <p>revealedLetters: {revealedLetters.join(', ')}</p>
                <p>incorrect: {incorrect}</p>
                <p>gameFinished: {gameFinished ? "Yes" : "No"}</p>
            </div>
        </div>
    );
};

export default Ahorcado;
