import { useState } from 'react';
import data from '../../data.json';
import backUp from '../../backUp.json';
import { TableHead } from './TableHead/TableHead';
import './Table.css';

export default function Table() {
    const [rowEditing, setRowEditing] = useState('');
    const [englishInputValue, setEnglishInputValue] = useState({});
    const [transcriptionInputValue, setTranscriptionInputValue] = useState({});
    const [russianInputValue, setRussianInputValue] = useState({});

    const [englishError, setEnglishError] = useState({});
    const [transcriptionError, setTranscriptionError] = useState({});
    const [russianError, setRussianError] = useState({});
    // состояние поиска слова
    const [search, setSearch] = useState('');

    // состояни валидации инпутов
    const [regexpValidation, setRegexpValidation] = useState({
        englishValid: '',
        translationValid: '',
        russianValid: '',
    });

    // future backup option
    const wordsData = Array.isArray(data) && data.length > 0 ? data : backUp;

    // кнопка редактировать
    function handleClick(id) {
        setRegexpValidation((prev) => ({
            ...prev,
            englishValid: '',
        }));
        setRegexpValidation((prev) => ({
            ...prev,
            russianValid: '',
        }));
        setEnglishError(true);
        setRussianError(true);
        setRowEditing(id);
    }
    // кнопка отмена
    const handleCancel = () => {
        setRussianInputValue(!russianInputValue);
        setRowEditing(!rowEditing);
    };

    // кнопка сохранить
    const handleSave = () => {
        if (!isInputsFilled) {
            alert('пустое поле');
        } else {
            const englishWord = englishInputValue[rowEditing];
            const transcription = transcriptionInputValue[rowEditing];
            const russianTranslation = russianInputValue[rowEditing];
            alert(
                `Изменения внесены: слово - ${englishWord}, транскрипция - ${transcription}, русский перевод - ${russianTranslation}`,
            );
            setRowEditing('');
        }
    };

    // инпут английский
    const handleEnglishEdit = (id, e) => {
        setEnglishInputValue((prevValue) => ({ ...prevValue, [id]: e.target.value }));
        const englishRegex = /^[A-Za-z]+$/;

        if (e.target.value.trim() === '') {
            setEnglishError(false);
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
            setEnglishError(true);
            setRegexpValidation((prev) => ({
                ...prev,
                englishValid: '',
            }));
        }
    };

    // инпут транскрипция
    const handleTranscriptionEdit = (id, e) => {
        setTranscriptionInputValue((prevValue) => ({ ...prevValue, [id]: e.target.value }));

        if (e.target.value.trim() === '') {
            setTranscriptionError(false);
        } else {
            setTranscriptionError(true);
        }
    };
    // инпут перевод
    const handleRussianEdit = (id, e) => {
        setRussianInputValue((prevValue) => ({ ...prevValue, [id]: e.target.value }));
        const russianRegex = /^[А-Яа-яЁё]+$/;

        if (e.target.value.trim() === '') {
            setRussianError(false);
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
            setRussianError(true);
            setRegexpValidation((prev) => ({
                ...prev,
                russianValid: '',
            }));
        }
    };

    // проверка заполнения инпутов
    const isInputsFilled = (id) => {
        return (
            englishInputValue[id] &&
            englishInputValue[id] !== '' &&
            transcriptionInputValue[id] &&
            transcriptionInputValue[id].trim() !== '' &&
            russianInputValue[id] &&
            russianInputValue[id].trim() !== ''
        );
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
    // данные с учетом поиска слова
    const visibleData = searchEnglish(wordsData, search);

    return (
        <table>
            <TableHead />
            {/* инпут для поиска слов */}
            <input type="text" placeholder="найти слово" onChange={(e) => onUpdateSearch(e)} />

            <tbody>
                {visibleData.map((item) => (
                    <tr key={item.id}>
                        {rowEditing === item.id ? (
                            <>
                                <td>
                                    <input
                                        type="text"
                                        name="english"
                                        value={englishInputValue[item.id] || ''}
                                        placeholder={item.english}
                                        onChange={(e) => handleEnglishEdit(item.id, e)}
                                        className={!englishError ? 'inputErrors' : ''}
                                    />
                                    {regexpValidation.englishValid[item.id] !== '' && (
                                        <div
                                            style={{
                                                color: 'red',
                                                fontSize: '12px',
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {regexpValidation.englishValid}
                                        </div>
                                    )}
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        name="transcription"
                                        value={transcriptionInputValue[item.id] || ''}
                                        placeholder={item.transcription}
                                        onChange={(e) => handleTranscriptionEdit(item.id, e)}
                                        className={!transcriptionError ? 'inputErrors' : ''}
                                    />
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        name="russian"
                                        value={russianInputValue[item.id] || ''}
                                        placeholder={item.russian}
                                        onChange={(e) => handleRussianEdit(item.id, e)}
                                        className={!russianError ? 'inputErrors' : ''}
                                    />
                                    {regexpValidation.russianValid[item.id] !== '' && (
                                        <div
                                            style={{
                                                color: 'red',
                                                fontSize: '12px',
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {regexpValidation.russianValid}
                                        </div>
                                    )}
                                </td>

                                <td>
                                    <button
                                        onClick={handleSave}
                                        disabled={!isInputsFilled(item.id)}
                                        className={!isInputsFilled(item.id) ? 'inactive' : ''}
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
                                    <button onClick={() => handleClick(item.id)}>
                                        редактировать
                                    </button>
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
