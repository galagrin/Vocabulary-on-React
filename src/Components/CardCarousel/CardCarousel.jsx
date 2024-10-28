import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import data from '../../data.json';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import backUp from '../../backUp.json';
import './CardCarousel.css';

export const CardCarousel = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [rolledOut, setRolledOut] = useState(false);
    const [count, setCount] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const [usedIds, setUsedIds] = useState([]);

    const [modalInfoOpen, setModalInfoOpen] = useState(false);
    // достаем количество изученных слов из localStorage
    useEffect(() => {
        setCount(JSON.parse(localStorage.getItem('usedId')));
    }, []);

    // переворот карточки
    const handleClick = () => {
        setFlipped(!flipped);
    };

    // future backup option
    const wordsData = Array.isArray(data) && data.length > 0 ? data : backUp;

    // переключение на следующую карточку и переворот на англ
    const handleNextWord = () => {
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 500);
        setWordIndex((wordIndex) => (wordIndex + 1) % wordsData.length);
        setFlipped(false);
    };

    // переключение на предыдущую карточку и переворот на англ
    const handlePrevWord = () => {
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 500);
        setWordIndex((wordIndex) => (wordIndex - 1 + data.length) % wordsData.length);
        setFlipped(false);
    };

    // счетчик выученных слов
    const handleWordsCount = (id) => {
        const currentId = wordsData[wordIndex].id;

        // проверка на уже использованное id
        if (!usedIds.includes(currentId)) {
            setCount((prevCount) => prevCount + 1);
            setUsedIds((prevUsedIds) => [...prevUsedIds, currentId]);
            // записываем количество изученных слов в localStorage
            localStorage.setItem('usedId', JSON.stringify(count + 1));
        }
    };

    const handleResetWordsCount = () => {
        window.localStorage.clear();
        setCount(0);
    };

    return (
        <div className="cardwrapper">
            <div className="modalcontainer">
                <div className="modal-showbtn" onClick={() => setModalInfoOpen(true)}>
                    <img src="./images/icon-info.svg" alt="" />
                </div>

                <Modal isOpen={modalInfoOpen} onClose={() => setModalInfoOpen(false)}>
                    <p>Здесь будет текст с информацией</p>
                </Modal>
            </div>
            <Card
                english={wordsData[wordIndex].english}
                transcription={wordsData[wordIndex].transcription}
                russian={wordsData[wordIndex].russian}
                id={wordsData[wordIndex].id}
                rollout={rolledOut}
                handleWordsCount={handleWordsCount}
                handleClick={handleClick}
                flipped={flipped}
            />
            <div className="buttonswrapp">
                <Button className="prev-btn" onClick={handlePrevWord} text="Назад" />
                <p className="counter">{`${parseInt(wordIndex) + 1} из ${wordsData.length}`}</p>
                <Button className="next-btn" onClick={handleNextWord} text="Вперед" />
            </div>

            <div>количество изученный слов: {count}</div>
            <Button text="Сбросить" onClick={handleResetWordsCount} />
        </div>
    );
};
