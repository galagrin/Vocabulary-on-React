import { useState } from 'react';
import Card from '../Card/Card';
import data from '../../data.json';
import { Button } from '../Button/Button';
import backUp from '../../backUp.json';
import './CardCarousel.css';

export const CardCarousel = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [rolledOut, setRolledOut] = useState(false);

    // future backup option
    const wordsData = Array.isArray(data) && data.length > 0 ? data : backUp;

    const handleNextWord = () => {
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 500);
        setWordIndex((wordIndex) => (wordIndex + 1) % wordsData.length);
    };

    const handlePrevWord = () => {
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 500);
        setWordIndex((wordIndex) => (wordIndex - 1 + data.length) % wordsData.length);
    };

    return (
        <div className="cardwrapper">
            <Card
                english={wordsData[wordIndex].english}
                transcription={wordsData[wordIndex].transcription}
                russian={wordsData[wordIndex].russian}
                rollout={rolledOut}
            />
            <div className="buttonswrapp">
                <Button className="prev-btn" onClick={handlePrevWord} text="Назад" />
                <p className="counter">{`${parseInt(wordIndex) + 1} из ${wordsData.length}`}</p>
                <Button className="next-btn" onClick={handleNextWord} text="Вперед" />
            </div>
        </div>
    );
};
