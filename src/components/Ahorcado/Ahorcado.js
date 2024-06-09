import React, { useRef, useEffect, useState } from 'react';
import './Ahorcado.css';
import wordDatabase from "./wordDatabase.json";
import zeroIncorrect from "./img/0.png"
import oneIncorrect from "./img/1.png"
import twoIncorrect from "./img/2.png"
import threeIncorrect from "./img/3.png"
import fourIncorrect from "./img/4.png"
import fiveIncorrect from "./img/5.png"

const Ahorcado = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [currentWordArray, setCurrentWordArray] = useState([]);
    const [revealedLetters, setRevealedLetters] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [incorrect, setIncorrect] = useState(0);

    useEffect(() => {
        initComponent()
    }, []);

    function initComponent() {
        const randomWord = getRandomWord();
        setCurrentWord(randomWord);
        refreshWordArray(randomWord);
        setRevealedLetters([]);
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
        setInputValue(input);
    }

    function isLetter(string) {
        return /^[a-zA-Z]*$/.test(string);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newLetter = inputValue.toUpperCase();
        if (!revealedLetters.includes(newLetter)) {
            setRevealedLetters(prevRevealedLetters => [...prevRevealedLetters, newLetter]);
            //TODO: Incorrect management
            if (!currentWord.includes(newLetter)) {
                setIncorrect(incorrect + 1);
            }
        }
        setInputValue('');
    };

    useEffect(() => {
        refreshWordArray(currentWord);
    }, [revealedLetters, currentWord]);

    function renderImage() {
        console.log('Render' + incorrect);
        switch (incorrect) {
            case 0:
                return <img src={zeroIncorrect} alt="Imagen del juego del ahorcado" />
            case 1:
                return <img src={oneIncorrect} alt="Imagen del juego del ahorcado" />
            case 2:
                return <img src={twoIncorrect} alt="Imagen del juego del ahorcado" />
            case 3:
                return <img src={threeIncorrect} alt="Imagen del juego del ahorcado" />
            case 4:
                return <img src={fourIncorrect} alt="Imagen del juego del ahorcado" />
            case 5:
                return <img src={fiveIncorrect} alt="Imagen del juego del ahorcado" />
        }
    }

    return (
        <div className="ahorcado-container">
            <h1>El juego del ahorcado</h1>
            {renderImage()}
            <div className="ahorcado-letras">
                {currentWordArray.map((letter, index) => (
                    <p key={index}>{letter}</p>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="ahorcado-input">
                    <input
                        type='text'
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Ingrese una letra"
                    />
                    <button type="submit">Enviar</button>
                </div>
            </form>

            {/* debug */}
            <div className='ahorcado-debug'>
                <p> - - - - Debug - - - - </p>
                <p>currentWord: {currentWord}</p>
                <p>currentWordArray: {currentWordArray}</p>
                <p>revealedLetters: {revealedLetters}</p>
                <p>incorrect: {incorrect}</p>
            </div>
        </div>
    );
};

export default Ahorcado; 
