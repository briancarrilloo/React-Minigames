import React, { useEffect, useState } from 'react';
import './WinLose.css';

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

    return (
        <div className={`fullscreen-modal ${isWin ? 'green-back' : 'red-back'} ${visible ? 'fade-in' : 'fade-out'}`}>
            <div className="modal-content">
                <h1>{message}</h1>
            </div>
        </div>
    );
}

export default WinLose;
