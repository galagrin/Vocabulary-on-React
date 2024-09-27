// import "./card.css";

// function Card(props) {
//     const { english, transcription, russian } = props;

//     function handleClick() {
//         document.getElementById("flip-card").classList.add("do-flip");
//     }
//     function handleClickBack() {
//         document.getElementById("flip-card").classList.remove("do-flip");
//     }

//     return (
//         <div className="flipwrapper">
//             <div id="flip-card">
//                 <div className="cardfront">
//                     <p>{english}</p>
//                     <p>{transcription}</p>
//                     <button id="cardbtn-turntoback" onClick={handleClick}>
//                         Посмотреть перевод
//                     </button>
//                 </div>

//                 <div className="cardback">
//                     <p>{russian}</p>
//                     <button id="cardbtn-turntofront" onClick={handleClickBack}>
//                         Вернуться
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Card;

import "./card.css";
import { useState } from "react";

function Card(props) {
    const [flipped, setFlipped] = useState(false);
    const handleClick = () => {
        setFlipped(!flipped);
    };
    const { english, transcription, russian } = props;

    return (
        <div className="flipwrapper">
            <div id="flip-card" className={flipped ? "do-flip" : ""}>
                <div className="cardfront">
                    <p>{english}</p>
                    <p>{transcription}</p>
                    <button id="cardbtn-turntoback" onClick={handleClick}>
                        Посмотреть перевод
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
