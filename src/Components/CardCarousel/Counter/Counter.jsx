export const Counter = ({ count, onClick }) => {
    return (
        <>
            <div className="counter-container">
                <p>количество изученный слов: {count}</p>
                <div onClick={onClick}>
                    <img src="./images/icon-trash.svg" alt="сбросить счетчик" />
                </div>
            </div>
        </>
    );
};
