import { useState } from 'react';
import data from '../../data.json';
import Card from '../Card/Card';
import { Button } from '../Button/Button';
import backUp from '../../backUp.json';
import './RandomCard.css';

export const RandomCard = () => {
    const [rolledOut, setRolledOut] = useState(false);

    // future backup option
    const wordsData = Array.isArray(data) && data.length > 0 ? data : backUp;

    const getRandomWord = () => {
        let randomIndex = Math.floor(Math.random() * wordsData.length);
        return wordsData[randomIndex];
    };

    const [randomWord, setRandomWord] = useState(getRandomWord());

    const handleClick = () => {
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 500);
        setRandomWord(getRandomWord());
    };

    return (
        <div className="cardwrapper">
            <Card
                english={randomWord.english}
                transcription={randomWord.transcription}
                russian={randomWord.russian}
                rollout={rolledOut}
            />
            <Button className="random-btn" onClick={handleClick} text="Еще одно случайное слово" />
            {/* <button className="random-btn" onClick={handleClick}>
                Еще одно случайное слово
            </button> */}
        </div>
    );
};
