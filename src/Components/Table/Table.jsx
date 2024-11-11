import { useState } from 'react';
import data from '../../data.json';
import backUp from '../../backUp.json';
import { TableHead } from './TableHead/TableHead';
import './Table.css';

export default function Table() {
    const [rowEditing, setRowEditing] = useState('');
    const [inputValue, setInputValue] = useState({ english: '', transcription: '', russian: '' });

    const [emptyFieldError, setEmptyFieldError] = useState({
        english: false,
        transcription: false,
        russian: false,
    });

    // состояние поиска слова
    const [search, setSearch] = useState('');

    // состояние валидации инпутов
    const [regexpValidation, setRegexpValidation] = useState({
        englishValid: '',
        transcriptionValid: '',
        russianValid: '',
    });
    // Состояние добавления Нового слова

    const [newWord, setNewWord] = useState({ english: '', transcription: '', russian: '' });

    // future backup option
    // const wordsData = Array.isArray(data) && data.length > 0 ? data : backUp;
    const [wordsData, setWordsData] = useState(data.length ? data : backUp);

    // кнопка редактировать
    function handleClick(id) {
        const itemToEdit = wordsData.find((item) => item.id === id);
        setInputValue({
            english: itemToEdit.english,
            transcription: itemToEdit.transcription,
            russian: itemToEdit.russian,
        });
        setRegexpValidation({ englishValid: '', transcriptionValid: '', russianValid: '' });
        setEmptyFieldError({ english: true, transcription: true, russian: true });
        setRowEditing(id);
    }
    // кнопка отмена
    const handleCancel = () => {
        setInputValue(!inputValue);
        setRowEditing({ english: '', transcription: '', russian: '' });
    };

    // кнопка сохранить
    const handleSave = (id) => {
        if (!isInputsFilled) {
            alert('пустое поле');
            return;
        } else {
            // записываем изменения в состояния wordsData и возвращаем item
            const updatedWords = wordsData.map((item) => {
                if (item.id === rowEditing) {
                    return {
                        ...item,
                        english: inputValue.english,
                        transcription: inputValue.transcription,
                        russian: inputValue.russian,
                    };
                }
                return item;
            });
            alert(`Изменения внесены: слово - ${inputValue.english}, транскрипция - ${inputValue.transcription}, русский перевод - ${inputValue.russian}`);
            setWordsData(updatedWords);
            setRowEditing('');
        }
    };

    // инпут английский
    const handleEnglishEdit = (id, e) => {
        setInputValue((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
        const englishRegex = /^[A-Za-z\s+]+$/;

        if (e.target.value.trim() === '') {
            setRegexpValidation((prev) => ({
                ...prev,
                englishValid: 'поле не должно быть пустым',
            }));
        } else if (!englishRegex.test(e.target.value.trim())) {
            setRegexpValidation((prev) => ({
                ...prev,
                englishValid: 'поле должно содержать английские буквы',
            }));
        } else {
            setEmptyFieldError((prevValue) => ({ ...prevValue, [e.target.name]: true }));
            setRegexpValidation((prev) => ({
                ...prev,
                englishValid: '',
            }));
        }
    };

    // инпут транскрипция
    const handleTranscriptionEdit = (id, e) => {
        setInputValue((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }));
        const transcriptionRegex = /^\[[a-zA-Zˈˌːˑˈˌːˑæʃɪʊɛɒʊʌɹɡʔʊəʤː\s+]*\]$/;

        if (e.target.value.trim() === '') {
            setRegexpValidation((prev) => ({
                ...prev,
                transcriptionValid: 'поле не должно быть пустым',
            }));
        } else if (!transcriptionRegex.test(e.target.value.trim())) {
            setRegexpValidation((prev) => ({
                ...prev,
                transcriptionValid: 'поле должно содержать английские буквы и символы []',
            }));
        } else {
            setEmptyFieldError((prevValue) => ({ ...prevValue, [e.target.name]: true }));
            setRegexpValidation((prev) => ({
                ...prev,
                transcriptionValid: '',
            }));
        }
    };
    // инпут перевод
    const handleRussianEdit = (id, e) => {
        setInputValue((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
        const russianRegex = /^[А-Яа-яЁё\s+]+$/;

        if (e.target.value.trim() === '') {
            setRegexpValidation((prev) => ({
                ...prev,
                russianValid: 'поле не должно быть пустым',
            }));
        } else if (!russianRegex.test(e.target.value.trim())) {
            setRegexpValidation((prev) => ({
                ...prev,
                russianValid: 'поле должно содержать русские буквы',
            }));
        } else {
            setEmptyFieldError((prevValue) => ({ ...prevValue, [e.target.name]: true }));
            setRegexpValidation((prev) => ({ ...prev, russianValid: '' }));
        }
    };

    // проверка заполнения инпутов
    const isInputsFilled = (id) => {
        return inputValue.english && inputValue.english.trim() !== '' && inputValue.transcription && inputValue.transcription.trim() !== '' && inputValue.russian && inputValue.russian.trim() !== '';
    };

    // функция поиска английского слова
    const searchEnglish = (data, search) => {
        if (search.length === 0) {
            return data;
        }
        return data.filter((item) => {
            return item.english.indexOf(search) > -1;
        });
    };
    // инпут поиска слова
    const onUpdateSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleNewWord = (e) => {
        setNewWord((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
        console.log(newWord);
    };
    const handleAddNewWord = () => {
        setNewWord({ english: '', transcription: '', russian: '' });
    };
    // данные с учетом поиска слова
    const visibleData = searchEnglish(wordsData, search);

    return (
        <table>
            <TableHead />
            <tbody>
                <tr>
                    <td className="searchrow">
                        <input type="text" placeholder="найти слово" onChange={(e) => onUpdateSearch(e)} />
                    </td>
                </tr>
                <tr className="newword-row">
                    <td>
                        <input type="text" name="english" placeholder="введите слово на английском" value={newWord.english} onChange={(e) => handleNewWord(e)} />
                    </td>
                    <td>
                        <input type="text" name="transcription" placeholder="введите транскрипцию" value={newWord.transcription} onChange={(e) => handleNewWord(e)} />
                    </td>
                    <td>
                        <input type="text" name="russian" placeholder="введите перевод" value={newWord.russian} onChange={(e) => handleNewWord(e)} />
                    </td>
                    <td>
                        <button onClick={handleAddNewWord}>добавить новое слово</button>
                    </td>
                </tr>

                {visibleData.map((item) => (
                    <tr key={item.id}>
                        {rowEditing === item.id ? (
                            <>
                                <td>
                                    <input
                                        type="text"
                                        name="english"
                                        value={inputValue.english || ''}
                                        placeholder={item.english}
                                        onChange={(e) => handleEnglishEdit(item.id, e)}
                                        className={!emptyFieldError.english ? 'inputErrors' : ''}
                                    />
                                    {regexpValidation.englishValid[item.id] !== '' && <div className="validationError">{regexpValidation.englishValid}</div>}
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        name="transcription"
                                        value={inputValue.transcription || ''}
                                        placeholder={item.transcription}
                                        onChange={(e) => handleTranscriptionEdit(item.id, e)}
                                        className={!emptyFieldError.transcription ? 'inputErrors' : ''}
                                    />
                                    {regexpValidation.transcriptionValid[item.id] !== '' && <div className="validationError">{regexpValidation.transcriptionValid}</div>}
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        name="russian"
                                        value={inputValue.russian || ''}
                                        placeholder={item.russian}
                                        onChange={(e) => handleRussianEdit(item.id, e)}
                                        className={!emptyFieldError.russian ? 'inputErrors' : ''}
                                    />
                                    {regexpValidation.russianValid[item.id] !== '' && <div className="validationError">{regexpValidation.russianValid}</div>}
                                </td>

                                <td>
                                    <button onClick={handleSave} disabled={!isInputsFilled(item.id)} className={!isInputsFilled(item.id) ? 'inactive' : ''}>
                                        сохранить
                                    </button>
                                    <button onClick={handleCancel}>отменить</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{item.english}</td>
                                <td>{item.transcription}</td>
                                <td>{item.russian}</td>

                                <td>
                                    <button onClick={() => handleClick(item.id)}>редактировать</button>
                                    <button>удалить</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
