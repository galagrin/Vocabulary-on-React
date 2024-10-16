import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import { Hamburger } from '../Hamburger/Hamberger';

export const Header = () => {
    const [showNavbar, setShowNavbar] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };
    const closeNavbar = () => {
        setShowNavbar(false);
    };

    const getActiveClass = ({ isActive }) => {
        return isActive ? `${'active'} ${'link'}` : 'link';
    };

    return (
        <header className="header">
            <div className="logowrapper">
                <img src="/images/catlogo.png" alt="Logo" className="headerlogo" />
                <div className="headername">Morning Cup of English</div>
            </div>

            <nav className="headernav">
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <Hamburger />
                </div>
                <ul className={`navlist ${showNavbar && 'active'}`}>
                    <li>
                        <NavLink className={getActiveClass} to="/" onClick={closeNavbar}>
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={getActiveClass} to="/game" onClick={closeNavbar}>
                            Учить слова
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={getActiveClass} to="/random" onClick={closeNavbar}>
                            Случайное слово
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
