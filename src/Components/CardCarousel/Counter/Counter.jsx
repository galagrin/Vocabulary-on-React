import "./Counter.css";

export const Counter = ({ count, onClick }) => {
    return (
        <>
            <div className="counter-container">
                <p>количество изученный слов: {count}</p>
                <div onClick={onClick} role="button">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/icon-trash.svg`}
                        alt="кнопка сброса счетчика"
                    />
                </div>
            </div>
        </>
    );
};
