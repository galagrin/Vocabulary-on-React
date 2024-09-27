import Card from "../Card/Card";
import data from "../../data.json";
import Table from "../Table/Table";

function Main() {
    let randomIndex = Math.floor(Math.random() * data.length);
    let randomWord = data[randomIndex];

    return (
        <main className="main">
            <Card
                english={randomWord.english}
                transcription={randomWord.transcription}
                russian={randomWord.russian}
            />
            <Table />
        </main>
    );
}

export default Main;
