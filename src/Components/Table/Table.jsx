import { useState, useContext } from 'react';
import { Context } from '../../Context.js';
import backUp from '../../backUp.json';
import { TableHead } from './TableHead/TableHead';
import { SearchRow } from './SearchRow/SearchRow.jsx';
import { Loader } from '../Loader/Loader.jsx';
import { AddNewWord } from './AddNewWord/AddNewWord.jsx';
import { toast } from 'react-toastify';

import './Table.css';

export default function Table() {
    const { dictionary, isLoading, deleteWord } = useContext(Context);
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
    const transcriptionRegex = /^\[[a-zA-Zˈˌːˑˈˌːˑæʃɪʊɛɒʊʌɹɡʔʊəʤɔ:iː,ˈʧ\s+]*\]$/;
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
    const handleDeleteWord = async (id) => {
        try {
            await deleteWord(id);
            console.log('Слово удалено');
            toast.success('Слово удалено', {
                className: 'toast-message',
            });
            const newWordsData = [...wordsData].filter((item) => item.id !== id);
            setWordsData(newWordsData);
        } catch (error) {
            console.error('Упс', error, {
                className: 'toast-message',
            });
            toast.error('Упс, что-то пошло не так! Попробуй еще раз', {
                className: 'toast-message',
            });
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

    const visibleData = searchEnglish(wordsData, search);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            <table>
                <TableHead />
                <tbody>
                    <SearchRow onChange={(e) => onUpdateSearch(e)} />

                    <AddNewWord
                        newWord={newWord}
                        setNewWord={setNewWord}
                        englishRegex={englishRegex}
                        transcriptionRegex={transcriptionRegex}
                        russianRegex={russianRegex}
                        wordsData={wordsData}
                        setWordsData={setWordsData}
                    />

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
                                        {regexpValidation.englishValid && <span className="validationError">{regexpValidation.englishValid}</span>}
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
                                            <span className="validationError">{regexpValidation.transcriptionValid}</span>
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
                                        {regexpValidation.russianValid && <span className="validationError">{regexpValidation.russianValid}</span>}
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
                                        {/* <button onClick={() => deleteWord(item.id)}>удалить</button> */}
                                        <button onClick={() => handleDeleteWord(item.id)}>удалить</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
