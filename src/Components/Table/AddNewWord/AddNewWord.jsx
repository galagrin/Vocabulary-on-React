import { useContext, useState } from 'react';
import { Context } from '../../../Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddNewWord.css';

export const AddNewWord = ({ newWord, setNewWord, englishRegex, transcriptionRegex, russianRegex, wordsData, setWordsData }) => {
    const { addNewWord } = useContext(Context);
    const [errors, setErrors] = useState({ english: '', transcription: '', russian: '' });

    const handleNewWord = (e) => {
        const { name, value } = e.target;
        setNewWord((prevValue) => ({ ...prevValue, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleAddNewWord = async (e) => {
        let hasError = false;
        const newErrors = { english: '', transcription: '', russian: '' };

        if (newWord.english.trim() === '' || !newWord.english.match(englishRegex)) {
            newErrors.english = 'Некорректное слово на английском';
            hasError = true;
        }
        if (newWord.transcription.trim() === '' || !newWord.transcription.match(transcriptionRegex)) {
            newErrors.transcription = 'Некорректная транскрипция';
            hasError = true;
        }
        if (newWord.russian.trim() === '' || !newWord.russian.match(russianRegex)) {
            newErrors.russian = 'Некорректный перевод';
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) {
            toast('Пожалуйста, исправьте ошибки', {
                className: 'toast-message',
            });
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
            toast('Изменения сохранены', {
                className: 'toast-message',
            });
            setWordsData((prev) => [...prev, newWordObject]);
        } catch (error) {
            console.error('Упс', error);
            toast('Упс, что-то пошло не так! Попробуй еще раз', {
                className: 'toast-message',
            });
        } finally {
            setNewWord({ english: '', transcription: '', russian: '' });
        }
    };

    return (
        <>
            <tr>
                <td>
                    <input
                        type="text"
                        name="english"
                        placeholder="введите слово на английском"
                        value={newWord.english}
                        onChange={handleNewWord}
                        className={errors.russian ? 'inputErrors' : ''}
                    />
                    {errors.english && <span className="validationError">{errors.english}</span>}
                </td>
                <td>
                    <input
                        type="text"
                        name="transcription"
                        placeholder="введите транскрипцию"
                        value={newWord.transcription}
                        onChange={handleNewWord}
                        className={errors.russian ? 'inputErrors' : ''}
                    />
                    {errors.transcription && <span className="validationError">{errors.transcription}</span>}
                </td>
                <td>
                    <input
                        type="text"
                        name="russian"
                        placeholder="введите перевод"
                        value={newWord.russian}
                        onChange={handleNewWord}
                        className={errors.russian ? 'inputErrors' : ''}
                    />
                    {errors.russian && <span className="validationError">{errors.russian}</span>}
                </td>
                <td>
                    <button onClick={handleAddNewWord}>добавить новое слово</button>
                </td>
            </tr>
        </>
    );
};
