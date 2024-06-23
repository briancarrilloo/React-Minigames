// EmojiMovible.js
import React, { useEffect, useState } from 'react';
import './EmojiMovible.css';

const EmojiMovible = ({ emoji }) => {
    const [position, setPosition] = useState({
        top: `${Math.random() * window.innerHeight}px`,
        left: `${Math.random() * window.innerWidth}px`
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const newPosition = {
                top: `${Math.random() * window.innerHeight}px`,
                left: `${Math.random() * window.innerWidth}px`
            };
            setPosition(newPosition);
        }, 10000); // Cambia la posición cada 2 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="emoji-movible" style={position}>
            {emoji}
        </div>
    );
}

export default EmojiMovible;
