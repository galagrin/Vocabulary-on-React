import { useState } from 'react';
import data from '../../data.json';
import './Table.css';

export default function Table() {
  const [rowEditing, setRowEditing] = useState('');
  const [englishInputValue, setEnglishInputValue] = useState('');
  const [transcriptionInputValue, setTranscriptionInputValue] = useState('');
  const [russianInputValue, setRussianInputValue] = useState('');

  function handleClick(id) {
    setRowEditing(id);
  }

  const handleCancel = () => {
    setRussianInputValue(!russianInputValue);
    setRowEditing(!rowEditing);
  };

  const handleEnglishEdit = (e) => {
    const newEnglish = e.target.value;
    setEnglishInputValue(newEnglish);
  };

  const handleTranscriptionEdit = (e) => {
    const newTranscription = e.target.value;
    setTranscriptionInputValue(newTranscription);
  };

  const handleRussianEdit = (id, e) => {
    setRussianInputValue((prevValue) => ({ ...prevValue, [id]: e.target.value }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Английский</th>
          <th>Транскрипция</th>
          <th>Перевод</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {rowEditing === item.id ? (
              <>
                <td>
                  <input
                    type="text"
                    value={englishInputValue || item.english}
                    onChange={handleEnglishEdit}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={transcriptionInputValue || item.transcription}
                    onChange={handleTranscriptionEdit}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={russianInputValue[item.id] || item.russian}
                    onChange={(e) => handleRussianEdit(item.id, e)}
                  />
                </td>

                <td>
                  <button>сохранить</button>
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
