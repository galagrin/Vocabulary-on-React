import { useContext } from 'react';
import { Context } from '../../../Context';

export const AddNewWord = ({ newWord, setNewWord, englishRegex, transcriptionRegex, russianRegex }) => {
    const { addNewWord } = useContext(Context);
    const handleNewWord = (e) => {
        const { name, value } = e.target;
        setNewWord((prevValue) => ({ ...prevValue, [name]: value }));
    };

    const handleAddNewWord = async (e) => {
        if (
            newWord.english.trim() === '' ||
            !newWord.english.match(englishRegex) ||
            newWord.transcription.trim() === '' ||
            !newWord.transcription.match(transcriptionRegex) ||
            newWord.russian.trim() === '' ||
            !newWord.russian.match(russianRegex)
        ) {
            alert('пустое поле или неправильный формат');
            return;
        }
        const newWordObject = {
            id: Date.now(),
            tags: 'newWord',
            tags_json: 'newWord',
            english: newWord.english,
            transcription: newWord.transcription,
            russian: newWord.russian,
        };
        try {
            console.log(newWordObject);
            await addNewWord(newWordObject);
            console.log('Слово добавлено');
        } catch (error) {
            console.error('Упс', error);
        } finally {
            setNewWord({ english: '', transcription: '', russian: '' });
        }
    };

    return (
        <tr className="newword-row">
            <td>
                <input
                    type="text"
                    name="english"
                    placeholder="введите слово на английском"
                    value={newWord.english}
                    onChange={(e) => handleNewWord(e)}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="transcription"
                    placeholder="введите транскрипцию"
                    value={newWord.transcription}
                    onChange={(e) => handleNewWord(e)}
                />
            </td>
            <td>
                <input type="text" name="russian" placeholder="введите перевод" value={newWord.russian} onChange={(e) => handleNewWord(e)} />
            </td>
            <td>
                <button onClick={handleAddNewWord}>добавить новое слово</button>
            </td>
        </tr>
    );
};
