import { useState, useContext } from 'react';
import { Context } from '../../Context.js';
import Card from '../Card/Card';
import { Button } from '../Button/Button';
import backUp from '../../backUp.json';
import './RandomCard.css';
import { Loader } from '../Loader/Loader.jsx';

export const RandomCard = () => {
    const { dictionary, isLoading } = useContext(Context);
    const [rolledOut, setRolledOut] = useState(false);
    const [flipped, setFlipped] = useState(false);

    // future backup option
    const wordsData = dictionary.length ? dictionary : backUp;

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
        setFlipped(false);
    };

    if (isLoading) {
        return <Loader />;
    }
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
};
