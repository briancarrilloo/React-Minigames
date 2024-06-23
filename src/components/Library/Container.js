import './Container.css';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsArrowRepeat } from 'react-icons/bs';

const ContainerHeader = ({ title, restartGame }) => {

    return (
        <div className="container-header">
            <Link to={"/"} className="btn button btn-dark d-flex align-items-center">
                <BsArrowLeft className="arrow-icon" />
            </Link>
            <button className="btn btn-dark last-button d-flex align-items-center" onClick={restartGame}>
                <BsArrowRepeat className="refresh-icon" />
            </button>
            <h1>{title}</h1>
        </div>
    );
}

export default ContainerHeader;