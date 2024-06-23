import React, { useEffect, useState } from 'react';
import './WinLose.css';
import { HappyEmoji, SadEmoji } from './Emoji'; // Importa los componentes de Emoji.js
import EmojiMovible from './EmojiMovible'; // Importa el componente EmojiMovible

const WinLose = ({ isWin, winMessage, loseMessage }) => {
    const [visible, setVisible] = useState(true);
    const message = isWin ? winMessage : loseMessage;

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000); // 3 segundos

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null; // Si no es visible, retorna null para no renderizar nada

    // Crea un array con la cantidad de emojis movibles que deseas mostrar
    const emojiCount = 10; // Número de emojis movibles que quieres mostrar
    const emojis = Array.from({ length: emojiCount }).map((_, index) => (
        <EmojiMovible key={index} emoji={isWin ? <HappyEmoji /> : <SadEmoji />} />
    ));

    return (
        <div className={`fullscreen-modal ${isWin ? 'green-back' : 'red-back'} ${visible ? 'fade-in' : 'fade-out'}`}>
            <div className="modal-content">
                {isWin ? <HappyEmoji /> : <SadEmoji />}
                <h1>{message}</h1>
            </div>
            {/* Renderiza los emojis movibles */}
            {emojis}
        </div>
    );
}

export default WinLose;
