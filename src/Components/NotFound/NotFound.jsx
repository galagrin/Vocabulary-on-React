import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
    return (
        <div className="main">
            <img src="images/kitten.png" alt="страница 404 картинка" className="notFoundImage" />
            <h1 className="notFoundText">Котику очень жаль, но такой страницы не существует</h1>

            <Link className="notFoundLink" to="/">
                На Главную
            </Link>
        </div>
    );
};
