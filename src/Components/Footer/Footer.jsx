import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <img
                src={`${process.env.PUBLIC_URL}/images/catcoffee.png`}
                alt="картинка котенок и кофе"
                className="footerlogo"
            />
            <p className="footername">Enjoy your hot morning cup of English</p>
        </footer>
    );
}

export default Footer;
