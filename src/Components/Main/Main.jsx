// Вариант с MathRamdom

// function Main() {
//     let randomIndex = Math.floor(Math.random() * data.length);
//     let randomWord = data[randomIndex];

//     return (
//         <main className="main">
//             <button className="prev-btn">Назад</button>
//             <Card
//                 english={randomWord.english}
//                 transcription={randomWord.transcription}
//                 russian={randomWord.russian}
//             />
//             <button className="next-btn">Вперед</button>
//             <Table />
//         </main>
//     );

// }

// export default Main;

import { useState } from 'react';
import Card from '../Card/Card';
import data from '../../data.json';
import Table from '../Table/Table';

function Main() {
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
    <main className="main">
      <button className="prev-btn" onClick={handlePrevWord}>
        Назад
      </button>
      <Card
        english={data[wordIndex].english}
        transcription={data[wordIndex].transcription}
        russian={data[wordIndex].russian}
        rollout={rolledOut}
      />
      <p className="counter">{`${parseInt(wordIndex) + 1} из ${data.length}`}</p>
      <button className="next-btn" onClick={handleNextWord}>
        Вперед
      </button>
      <Table />
    </main>
  );
}

export default Main;
