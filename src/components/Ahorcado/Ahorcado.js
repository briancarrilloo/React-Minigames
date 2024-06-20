import React, { useEffect, useState } from 'react';
import './Ahorcado.css';
import wordDatabase from "./wordDatabase.json";
import zeroIncorrect from "./img/0.png"
import oneIncorrect from "./img/1.png"
import twoIncorrect from "./img/2.png"
import threeIncorrect from "./img/3.png"
import fourIncorrect from "./img/4.png"
import fiveIncorrect from "./img/5.png"

const Ahorcado = ({ selectGame }) => {
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
        setInputValue(input.toUpperCase());
    }

    function isLetter(string) {
        if (string.toLowerCase() == "ñ") {
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
                setIncorrect(incorrect + 1);
            }
        }

        setInputValue('');
    };

    useEffect(() => {
        CheckGameStatus();
    }, [incorrect]);

    function CheckGameStatus() {
        // Losing
        if (incorrect >= 5) {
            alert('Has perdido...')
        }

        // Winning
        const currentWordString = currentWordArray.concat();
        if (currentWord == currentWordString) {
            alert('Has ganado!')
        }
    }

    useEffect(() => {
        refreshWordArray(currentWord);
    }, [revealedLetters, currentWord]);

    function renderImage() {
        const imgAlt = "Imagen del juego del ahorcado";
        switch (incorrect) {
            case 0:
                return <img src={zeroIncorrect} alt={imgAlt} />
            case 1:
                return <img src={oneIncorrect} alt={imgAlt} />
            case 2:
                return <img src={twoIncorrect} alt={imgAlt} />
            case 3:
                return <img src={threeIncorrect} alt={imgAlt} />
            case 4:
                return <img src={fourIncorrect} alt={imgAlt} />
            case 5:
                return <img src={fiveIncorrect} alt={imgAlt} />
            default:
                return <img src={fiveIncorrect} alt={imgAlt} />
        }
    }

    return (
        <div className="ahorcado-container">
            <h1>El juego del ahorcado</h1>
            <button onClick={() => selectGame("")}>Quit</button>
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
                    <button class="btn btn-primary" type="submit">Enviar</button>
                </div>
            </form >
            <p>Letras intentadas: {revealedLetters}</p>

            {/* debug */}
            <div className='ahorcado-debug'>
                <p> - - - - Debug - - - - </p>
                <p>currentWord: {currentWord}</p>
                <p>currentWordArray: {currentWordArray}</p>
                <p>revealedLetters: {revealedLetters}</p>
                <p>incorrect: {incorrect}</p>
            </div>
        </div >
    );
};

export default Ahorcado; 
