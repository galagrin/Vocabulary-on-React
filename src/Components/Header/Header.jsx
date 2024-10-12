import './header.css';

export const Header = () => {
    return (
        <header className="header">
            <div className="logowrapper">
                <img src="/images/catlogo.png" alt="Logo" className="headerlogo" />
                <div className="headername">Morning Cup of English</div>
            </div>
            <nav className="headernav">
                <ul className="navlist">
                    <li>
                        <a href="#home">Главная</a>
                    </li>
                    <li>
                        <a href="#learn">Учить слова</a>
                    </li>
                    <li>
                        <a href="#random">Случайное слово</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
