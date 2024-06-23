import React from 'react';
import './WinLose.css';
import { Link } from 'react-router-dom';

const WinLose = ({ isWin, winMessage, loseMessage, restartGame, exitGame }) => {
    const message = isWin ? winMessage : loseMessage;

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{isWin ? '¡Has Ganado!' : 'Has Perdido'}</h5>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <Link to={"/"} className="btn btn-light">
                            Salir
                        </Link>
                        <button type="button" className="btn btn-primary" onClick={restartGame}>Reiniciar Juego</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WinLose;
