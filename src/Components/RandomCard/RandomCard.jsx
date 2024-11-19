import { useState } from 'react';
import Card from '../Card/Card';
import { Button } from '../Button/Button';
import { observer } from 'mobx-react-lite';
import wordsStore from '../../store/WordsStore.js';
import { Loader } from '../Loader/Loader.jsx';
import './RandomCard.css';

export const RandomCard = observer(() => {
    const [rolledOut, setRolledOut] = useState(false);
    const [flipped, setFlipped] = useState(false);

    // переворот карточки
    const handleClick = () => {
        setFlipped(!flipped);
    };

    const handleRandomClick = () => {
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 500);
        // получаем из стора случайное слово
        wordsStore.getRandomWord();
        setFlipped(false);
    };

    if (wordsStore.isLoading) {
        return <Loader />;
    }

    const randomWord = wordsStore.randomWord;

    return (
        <div className="cardwrapper">
            <Card
                english={randomWord.english}
                transcription={randomWord.transcription}
                russian={randomWord.russian}
                rollout={rolledOut}
                handleClick={handleClick}
                flipped={flipped}
            />
            <Button className="random-btn" onClick={handleRandomClick} text="Еще одно случайное слово" />
        </div>
    );
});
