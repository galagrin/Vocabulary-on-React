import { useState } from 'react';
import data from '../../data.json';
import Card from '../Card/Card';
import { Button } from '../Button/Button';
import backUp from '../../backUp.json';
import './RandomCard.css';

export const RandomCard = () => {
    const [rolledOut, setRolledOut] = useState(false);
    const [flipped, setFlipped] = useState(false);

    // future backup option
    const wordsData = Array.isArray(data) && data.length > 0 ? data : backUp;

    const getRandomWord = () => {
        let randomIndex = Math.floor(Math.random() * wordsData.length);
        return wordsData[randomIndex];
    };

    const [randomWord, setRandomWord] = useState(getRandomWord());

    // переворот карточки
    const handleClick = () => {
        setFlipped(!flipped);
    };

    const handleRandomClick = () => {
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 500);
        setRandomWord(getRandomWord());
        setFlipped(!flipped);
    };

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
            <Button
                className="random-btn"
                onClick={handleRandomClick}
                text="Еще одно случайное слово"
            />
        </div>
    );
};
