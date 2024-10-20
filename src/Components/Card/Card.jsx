import { useRef } from 'react';
import './card.css';

function Card(props) {
    const cardRef = useRef(null);
    const handleClick = () => {
        cardRef.current.addEventListener(
            'transitionend',
            () => {
                cardRef.current.classList.toggle('do-flip');
            },
            { once: true },
        );
    };

    const { english, transcription, russian, rollout } = props;

    return (
        <div className={rollout ? 'flipwrapper roll-out' : 'flipwrapper'}>
            <div id="flip-card" ref={cardRef}>
                <div className="cardfront">
                    <p>{english}</p>
                    <p>{transcription}</p>
                    <button id="cardbtn-turntoback" onClick={handleClick}>
                        Перевод
                    </button>
                </div>

                <div className="cardback">
                    <p>{russian}</p>
                    <button id="cardbtn-turntofront" onClick={handleClick}>
                        Вернуться
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
