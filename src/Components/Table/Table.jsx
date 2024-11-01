import { useState } from 'react';
import data from '../../data.json';
import backUp from '../../backUp.json';
import { TableHead } from './TableHead/TableHead';
import './Table.css';

export default function Table() {
    const [rowEditing, setRowEditing] = useState('');
    const [englishInputValue, setEnglishInputValue] = useState('');
    const [transcriptionInputValue, setTranscriptionInputValue] = useState('');
    const [russianInputValue, setRussianInputValue] = useState('');

    // future backup option
    const wordsData = Array.isArray(data) && data.length > 0 ? data : backUp;

    // кнопка резактировать
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
        if (
            englishInputValue === '' ||
            transcriptionInputValue === '' ||
            russianInputValue === ''
        ) {
            alert('пустое поле');
        }
    };
    // инпут английский
    const handleEnglishEdit = (e) => {
        const newEnglish = e.target.value;
        setEnglishInputValue(newEnglish);
    };
    // инпут транскрипция
    const handleTranscriptionEdit = (e) => {
        const newTranscription = e.target.value;
        setTranscriptionInputValue(newTranscription);
    };
    // инпут перевод
    const handleRussianEdit = (id, e) => {
        setRussianInputValue((prevValue) => ({ ...prevValue, [id]: e.target.value }));
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
                                        value={englishInputValue}
                                        placeholder={englishInputValue || item.english}
                                        onChange={handleEnglishEdit}
                                    />
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        value={transcriptionInputValue}
                                        placeholder={transcriptionInputValue || item.transcription}
                                        onChange={handleTranscriptionEdit}
                                    />
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        value={russianInputValue[item.id]}
                                        placeholder={russianInputValue[item.id] || item.russian}
                                        onChange={(e) => handleRussianEdit(item.id, e)}
                                    />
                                </td>

                                <td>
                                    <button onClick={handleSave}>сохранить</button>
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
