import './card.css';
import { useRef, useEffect } from 'react';

function Card(props) {
    const buttonRef = useRef(null);
    useEffect(() => {
        buttonRef.current.focus();
    });

    const { english, transcription, russian, rollout, id, handleWordsCount, handleClick, flipped } =
        props;

    return (
        <div className={rollout ? 'flipwrapper roll-out' : 'flipwrapper'}>
            <div className={flipped ? 'flip-card do-flip' : 'flip-card'}>
                <div className="cardfront">
                    <p>{english}</p>
                    <p>{transcription}</p>
                    <button
                        className="cardbtn-turntoback"
                        onClick={() => {
                            handleClick();

                            if (handleWordsCount) {
                                handleWordsCount(id);
                            }
                        }}
                        ref={buttonRef}
                    >
                        Посмотреть перевод
                    </button>
                </div>

                <div className="cardback">
                    <p>{russian}</p>
                    <button className="cardbtn-turntofront" onClick={handleClick}>
                        Вернуться
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
