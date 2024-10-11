import { useState } from 'react';
import './card.css';

function Card(props) {
  const [flipped, setFlipped] = useState(false);
  const handleClick = () => {
    setFlipped(!flipped);
  };
  const { english, transcription, russian, rollout } = props;

  return (
    <div className={rollout ? 'flipwrapper roll-out' : 'flipwrapper'}>
      <div id="flip-card" className={flipped ? 'do-flip' : ''}>
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
