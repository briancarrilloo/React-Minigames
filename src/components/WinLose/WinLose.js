import React, { useEffect, useState } from 'react';
import './WinLose.css';

const WinLose = ({ isWin, winMessage, loseMessage, restartGame }) => {
    const [visible, setVisible] = useState(true);
    const message = isWin ? winMessage : loseMessage;

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            restartGame();
        }, 3000); // 3 segundos

        return () => clearTimeout(timer);
    }, [restartGame]);

    return (
        <div className={`fullscreen-modal ${visible ? 'fade-in' : 'fade-out'}`}>
            <div className="modal-content">
                <h1>{message}</h1>
            </div>
        </div>
    );
}

export default WinLose;
