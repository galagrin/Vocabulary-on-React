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

    // future backup option
    const wordsData = Array.isArray(data) && data.length > 0 ? data : backUp;

    // кнопка реДактировать
    function handleClick(id) {
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
            console.log('значение сохранено');
            setRowEditing('');
        }
    };
    // инпут английский
    const handleEnglishEdit = (id, e) => {
        setEnglishInputValue((prevValue) => ({ ...prevValue, [id]: e.target.value }));

        if (e.target.value.trim() === '') {
            console.log('пустое поле');
            setEnglishError(false);
        } else {
            setEnglishError(true);
        }
    };
    // инпут транскрипция
    const handleTranscriptionEdit = (id, e) => {
        setTranscriptionInputValue((prevValue) => ({ ...prevValue, [id]: e.target.value }));
        if (e.target.value.trim() === '') {
            console.log('пустое поле');
            setTranscriptionError(false);
        } else {
            setTranscriptionError(true);
        }
    };
    // инпут перевод
    const handleRussianEdit = (id, e) => {
        setRussianInputValue((prevValue) => ({ ...prevValue, [id]: e.target.value }));
        if (e.target.value.trim() === '') {
            console.log('пустое поле');
            setRussianError(false);
        } else {
            setRussianError(true);
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

    return (
        <table>
            <TableHead />

            <tbody>
                {wordsData.map((item) => (
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
                                        // onBlur={(e) => blurHandler(item.id, e)}
                                    />
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        name="transcription"
                                        value={transcriptionInputValue[item.id] || ''}
                                        placeholder={item.transcription}
                                        onChange={(e) => handleTranscriptionEdit(item.id, e)}
                                        className={!transcriptionError ? 'inputErrors' : ''}
                                        // onBlur={(e) => blurHandler(item.id, e)}
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
                                        // onBlur={(e) => blurHandler(item.id, e)}
                                    />
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
