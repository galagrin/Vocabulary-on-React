import { useState, useContext } from 'react';
import data from '../../data.json';
import { Context } from '../../Context.js';
import backUp from '../../backUp.json';
import { TableHead } from './TableHead/TableHead';
import './Table.css';
import { SearchRow } from './SearchRow/SearchRow.jsx';

export default function Table() {
    const { dictionary } = useContext(Context);
    const [rowEditing, setRowEditing] = useState('');
    const [inputValue, setInputValue] = useState({ english: '', transcription: '', russian: '' });

    const [emptyFieldError, setEmptyFieldError] = useState({ english: false, transcription: false, russian: false });

    // состояние поиска слова
    const [search, setSearch] = useState('');

    // состояние валидации инпутов
    const [regexpValidation, setRegexpValidation] = useState({
        englishValid: '',
        transcriptionValid: '',
        russianValid: '',
    });

    const [newWord, setNewWord] = useState({ english: '', transcription: '', russian: '' });
    const [wordsData, setWordsData] = useState(dictionary.length ? dictionary : backUp);

    const englishRegex = /^[A-Za-z\s+]+$/;
    const transcriptionRegex = /^\[[a-zA-Zˈˌːˑˈˌːˑæʃɪʊɛɒʊʌɹɡʔʊəʤː\s+]*\]$/;
    const russianRegex = /^[А-Яа-яЁё\s+]+$/;

    function handleEdit(id) {
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

    const handleCancel = () => {
        setInputValue({ english: '', transcription: '', russian: '' });
        setRowEditing('');
    };

    const handleSave = (id) => {
        if (!isInputsFilled()) {
            alert('пустое поле или неправильный формат');
            return;
        } else {
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
            alert(
                `Изменения внесены: слово - ${inputValue.english}, транскрипция - ${inputValue.transcription}, русский перевод - ${inputValue.russian}`,
            );
            setWordsData(updatedWords);
            setRowEditing('');
        }
    };

    const handleInputChange = (e, regexErrorMessage) => {
        const { name, value } = e.target;
        const emptyErrorMessage = 'поле не должно быть пустым';
        setInputValue((prevValue) => ({ ...prevValue, [name]: value }));

        // Проверка на пустое поле
        if (value.trim() === '') {
            setRegexpValidation((prev) => ({
                ...prev,
                [`${name}Valid`]: emptyErrorMessage,
            }));
            setEmptyFieldError((prevValue) => ({ ...prevValue, [name]: false }));
        } else {
            let regex;
            if (name === 'english') {
                regex = englishRegex;
            } else if (name === 'transcription') {
                regex = transcriptionRegex;
            } else if (name === 'russian') {
                regex = russianRegex;
            }

            // Проверка на валидность по регулярному выражению
            if (!regex.test(value.trim())) {
                setRegexpValidation((prev) => ({
                    ...prev,
                    [`${name}Valid`]: regexErrorMessage,
                }));
                setEmptyFieldError((prevValue) => ({ ...prevValue, [name]: true }));
            } else {
                setEmptyFieldError((prevValue) => ({ ...prevValue, [name]: true }));
                setRegexpValidation((prev) => ({
                    ...prev,
                    [`${name}Valid`]: '',
                }));
            }
        }
    };

    // проверка заполнения инпутов и валидности для disabled на кнопке
    const isInputsFilled = () => {
        return (
            inputValue.english &&
            inputValue.english.trim() !== '' &&
            inputValue.transcription &&
            inputValue.transcription.trim() !== '' &&
            inputValue.russian &&
            inputValue.russian.trim() !== '' &&
            regexpValidation.englishValid === '' &&
            regexpValidation.transcriptionValid === '' &&
            regexpValidation.russianValid === ''
        );
    };

    const searchEnglish = (data, search) => {
        if (search.length === 0) {
            return data;
        }
        return data.filter((item) => {
            return item.english.indexOf(search) > -1;
        });
    };

    const onUpdateSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleNewWord = (e) => {
        setNewWord((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
    };

    const handleAddNewWord = () => {
        setNewWord({ english: '', transcription: '', russian: '' });
    };

    const visibleData = searchEnglish(wordsData, search);

    return (
        <table>
            <TableHead />
            <tbody>
                <SearchRow onChange={(e) => onUpdateSearch(e)} />

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
                                        onChange={(e) => handleInputChange(e, 'поле должно содержать английские буквы')}
                                        className={!emptyFieldError.english || regexpValidation.englishValid ? 'inputErrors' : ''}
                                    />
                                    {regexpValidation.englishValid && <div className="validationError">{regexpValidation.englishValid}</div>}
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        name="transcription"
                                        value={inputValue.transcription || ''}
                                        placeholder={item.transcription}
                                        onChange={(e) => handleInputChange(e, 'поле должно содержать английские буквы и символы []')}
                                        className={!emptyFieldError.transcription || regexpValidation.transcriptionValid ? 'inputErrors' : ''}
                                    />
                                    {regexpValidation.transcriptionValid && (
                                        <div className="validationError">{regexpValidation.transcriptionValid}</div>
                                    )}
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        name="russian"
                                        value={inputValue.russian || ''}
                                        placeholder={item.russian}
                                        onChange={(e) => handleInputChange(e, 'поле должно содержать русские буквы')}
                                        className={!emptyFieldError.russian || regexpValidation.russianValid ? 'inputErrors' : ''}
                                    />
                                    {regexpValidation.russianValid && <div className="validationError">{regexpValidation.russianValid}</div>}
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleSave(item.id)}
                                        disabled={!isInputsFilled()}
                                        className={!isInputsFilled() ? 'inactive' : ''}
                                    >
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
                                    <button onClick={() => handleEdit(item.id)}>редактировать</button>
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
