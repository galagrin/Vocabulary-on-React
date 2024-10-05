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

import { useState } from "react";
import Card from "../Card/Card";
import data from "../../data.json";
import Table from "../Table/Table";


function Main() {
    const [wordIndex, setWordIndex] = useState("0")

    const handleNextWord = ()=> {
        
        setWordIndex((wordIndex) => (wordIndex + 1) % data.length) 
    };
    const handlePrevWord = () =>{
        setWordIndex((wordIndex) => (wordIndex - 1) % data.length) 
    }


    return (
        <main className="main">
            <button className="prev-btn" onClick = {handlePrevWord}>Назад</button>
            <Card
                english={data[wordIndex].english}
                transcription={data[wordIndex].transcription}
                russian={data[wordIndex].russian}
            />
            <button className="next-btn" onClick = {handleNextWord}>Вперед</button>
            <Table />
        </main>
    );
}

export default Main;


