import './Button.css';

export const Button = ({ className, onClick, text }) => {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
};
