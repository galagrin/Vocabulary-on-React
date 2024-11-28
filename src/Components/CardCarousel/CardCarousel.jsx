import { useEffect, useState, useContext } from 'react';
import Card from '../Card/Card';

import { Context } from '../../store/Context.js';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import backUp from '../../backUp.json';

import './CardCarousel.css';
import { Counter } from './Counter/Counter';
import { Loader } from '../Loader/Loader.jsx';

export const CardCarousel = () => {
    const { dictionary, isLoading } = useContext(Context);
    const [wordIndex, setWordIndex] = useState(0);
    const [rolledOut, setRolledOut] = useState(false);
    const [count, setCount] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [usedIds, setUsedIds] = useState([]);

    // модальное окно с информацией
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
    // const wordsData = Array.isArray(data) && data.length > 0 ? data : backUp;
    const wordsData = dictionary.length ? dictionary : backUp;

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
        setWordIndex((wordIndex) => (wordIndex - 1 + wordsData.length) % wordsData.length);
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

    // сброс счетчика изученных слов
    const handleResetWordsCount = () => {
        window.localStorage.clear();
        setCount(0);
    };
    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="cardwrapper">
            <div className="modal-container">
                <div className="modal-showbtn" onClick={() => setModalInfoOpen(true)}>
                    <img src="./images/icon-info.svg" alt="информация" />
                </div>

                <Modal isOpen={modalInfoOpen} onClose={() => setModalInfoOpen(false)}>
                    <p>
                        Изучайте слова, использую кнопки Вперед и Назад. При просмотре перевода слова оно будет засчитано как изученное. Количество
                        изученных слов указаны под карточкой в счетчике. Сбрасывайте счетчик нажатием на корзину рядом с ним.
                    </p>
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

            <Counter count={count} onClick={handleResetWordsCount} />
        </div>
    );
};
