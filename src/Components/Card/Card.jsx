// import { useRef } from 'react';
// import './card.css';

// function Card(props) {
//     const cardRef = useRef(null);

//     const handleClick = () => {
//         cardRef.current.addEventListener(
//             'transitionend',
//             () => {
//                 cardRef.current.classList.toggle('do-flip');
//             },
//             { once: true },
//         );
//     };

//     const { english, transcription, russian, rollout, id, handleWordsCount } = props;

//     return (
//         <div className={rollout ? 'flipwrapper roll-out' : 'flipwrapper'}>
//             <div className="flip-card" ref={cardRef}>
//                 <div className="cardfront">
//                     <p>{english}</p>
//                     <p>{transcription}</p>
//                     <button
//                         className="cardbtn-turntoback"
//                         onClick={() => {
//                             handleClick();
//                             handleWordsCount(id);
//                         }}
//                     >
//                         Перевод
//                     </button>
//                 </div>

//                 <div className="cardback">
//                     <p>{russian}</p>
//                     <button className="cardbtn-turntofront" onClick={handleClick}>
//                         Вернуться
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Card;

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
