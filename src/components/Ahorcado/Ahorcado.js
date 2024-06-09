import React, { useRef, useEffect, useState } from 'react';
import './Ahorcado.css';
import wordDatabase from "./wordDatabase.json";

const Ahorcado = () => {
    const [currentWord, setCurrentWord] = useState(getRandomWord());

    useEffect(() => {
        initComponent()
    }, []);

    function initComponent() {
        const randomWord = getRandomWord();
        setCurrentWord(randomWord);

    }

    function getRandomWord() {
        const words = wordDatabase.words;
        const randomWord = words[Math.floor(Math.random() * words.length)];
        return randomWord.toUpperCase();
    }

    return (
        <div className="ahorcado-container">
            <h1>El juego del ahorcado</h1>
            <p>La palabra es: {currentWord}</p>
        </div>
    );
};

export default Ahorcado; 
