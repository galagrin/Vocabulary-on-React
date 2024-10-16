import { useState } from 'react';
import Card from '../Card/Card';
import data from '../../data.json';
import { Button } from '../Button/Button';

export const CardCarousel = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [rolledOut, setRolledOut] = useState(false);

    const handleNextWord = () => {
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 500);
        setWordIndex((wordIndex) => (wordIndex + 1) % data.length);
    };

    const handlePrevWord = () => {
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 500);
        setWordIndex((wordIndex) => (wordIndex - 1 + data.length) % data.length);
    };

    return (
        <div className="main">
            <Button className="prev-btn" onClick={handlePrevWord} text="Назад" />
            <Card
                english={data[wordIndex].english}
                transcription={data[wordIndex].transcription}
                russian={data[wordIndex].russian}
                rollout={rolledOut}
            />
            <p className="counter">{`${parseInt(wordIndex) + 1} из ${data.length}`}</p>
            <Button className="next-btn" onClick={handleNextWord} text="Вперед" />
        </div>
    );
};
