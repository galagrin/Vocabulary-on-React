import { useState } from 'react';
import data from '../../data.json';
import Card from '../Card/Card';
import { Button } from '../Button/Button';
import './RandomCard.css';

export const RandomCard = () => {
    const getRandomWord = () => {
        let randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
    };

    const [randomWord, setRandomWord] = useState(getRandomWord());

    const handleClick = () => {
        setRandomWord(getRandomWord());
    };

    return (
        <>
            <Card
                english={randomWord.english}
                transcription={randomWord.transcription}
                russian={randomWord.russian}
            />
            <Button className="random-btn" onClick={handleClick} text="Еще одно случайное слово" />
            {/* <button className="random-btn" onClick={handleClick}>
                Еще одно случайное слово
            </button> */}
        </>
    );
};
