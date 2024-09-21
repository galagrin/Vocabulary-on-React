function Card() {
    function handleClick() {
        document.getElementById("flip-card").classList.add("do-flip");
    }
    function handleClickBack() {
        document.getElementById("flip-card").classList.remove("do-flip");
    }

    return (
        <div className="flipwrapper">
            <div id="flip-card">
                <div className="cardfront">
                    <p>Слово</p>
                    <p>Транскрипция</p>
                    <button id="cardbtn-turntoback" onClick={handleClick}>
                        Посмотреть перевод
                    </button>
                </div>

                <div className="cardback">
                    <p>Back</p>
                    <button id="cardbtn-turntofront" onClick={handleClickBack}>
                        Вернуться
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
