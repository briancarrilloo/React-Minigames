import React, { useRef, useEffect, useState } from 'react';
import './Ahorcado.css';
import wordDatabase from "./wordDatabase.json";

const Ahorcado = () => {
    const [currentWord, setCurrentWord] = useState(getRandomWord());
    const [currentWordArray, setCurrentWordArray] = useState([]);
    const [revealedLetters, setRevealedLetters] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        initComponent()
    }, []);

    function initComponent() {
        const randomWord = getRandomWord();
        setCurrentWord(randomWord);
        setCurrentWordArray(randomWord.split(''));
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
        const newLetter = inputValue.toLowerCase();
        if (!revealedLetters.includes(newLetter)) {
            setRevealedLetters([...revealedLetters, newLetter]);
        }
        setInputValue('');
    };

    return (
        <div className="ahorcado-container">
            <h1>El juego del ahorcado</h1>
            {currentWordArray.map((letter, index) => (
                <p key={index}>{index} - {letter}</p>
            ))}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ingrese una letra" />
                <button type="submit">Enviar</button>
            </form>
            <div className='debug'>
                <p> - - - - Debug - - - - </p>
                <p>currentWord: {currentWord}</p>
                <p>revealedLetters: {revealedLetters}</p>
            </div>
        </div>
    );
};

export default Ahorcado; 
