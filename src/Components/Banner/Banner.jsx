import { Link } from 'react-router-dom';
import { LoginForm } from '../LoginForm/LoginForm';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Banner.css';

export const Banner = () => {
    return (
        <div className="bannerwrap">
            <div className="banner-info">
                <p>
                    Привет, дорогой друг! <br /> Добро пожаловать на утреннюю чашечку английских слов. Ты можешь сразу начать учить или сначала
                    зарегистрироваться.
                </p>
                <Link to="/game" className="banner__link">
                    <FaArrowRight />
                    Учить слова <FaArrowLeft />
                </Link>
            </div>

            <LoginForm />
        </div>
    );
};
