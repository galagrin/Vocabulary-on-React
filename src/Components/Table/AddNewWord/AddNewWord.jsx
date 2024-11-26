// import { useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import wordsStore from '../../../store/WordsStore';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './AddNewWord.css';

// export const AddNewWord = observer(({ newWord, setNewWord, englishRegex, transcriptionRegex, russianRegex }) => {
//     const [errors, setErrors] = useState({ english: '', transcription: '', russian: '' });

//     const handleNewWord = (e) => {
//         const { name, value } = e.target;
//         setNewWord((prevValue) => ({ ...prevValue, [name]: value }));
//         setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
//     };

//     //добавление слова
//     const handleAddNewWord = async () => {
//         let hasError = false;
//         const newErrors = { english: '', transcription: '', russian: '' };

//         if (newWord.english.trim() === '' || !newWord.english.match(englishRegex)) {
//             newErrors.english = 'Некорректное слово на английском';
//             hasError = true;
//         }
//         if (newWord.transcription.trim() === '' || !newWord.transcription.match(transcriptionRegex)) {
//             newErrors.transcription = 'Некорректная транскрипция';
//             hasError = true;
//         }
//         if (newWord.russian.trim() === '' || !newWord.russian.match(russianRegex)) {
//             newErrors.russian = 'Некорректный перевод';
//             hasError = true;
//         }
//         setErrors(newErrors);

//         if (hasError) {
//             toast('Пожалуйста, исправьте ошибки', {
//                 className: 'toast-message',
//             });
//             return;
//         }

//         const newWordObject = {
//             id: Date.now(),
//             tags: 'newWord',
//             tags_json: 'newWord',
//             english: newWord.english,
//             transcription: newWord.transcription,
//             russian: newWord.russian,
//         };

//         try {
//             console.log(newWordObject);
//             await wordsStore.addNewWord(newWordObject);
//             console.log('Слово добавлено');
//             toast('Изменения сохранены', {
//                 className: 'toast-message',
//             });
//             wordsStore.dictionary = [...wordsStore.dictionary, newWordObject];
//         } catch (error) {
//             console.error('Упс', error);
//             toast('Упс, что-то пошло не так! Попробуй еще раз', {
//                 className: 'toast-message',
//             });
//         } finally {
//             setNewWord({ english: '', transcription: '', russian: '' });
//         }
//     };

//     return (
//         <>
//             <tr>
//                 <td>
//                     <input
//                         type="text"
//                         name="english"
//                         placeholder="введите слово на английском"
//                         value={newWord.english}
//                         onChange={handleNewWord}
//                         className={errors.english ? 'inputErrors' : ''}
//                     />
//                     {errors.english && <span className="validationError">{errors.english}</span>}
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         name="transcription"
//                         placeholder="введите транскрипцию"
//                         value={newWord.transcription}
//                         onChange={handleNewWord}
//                         className={errors.transcription ? 'inputErrors' : ''}
//                     />
//                     {errors.transcription && <span className="validationError">{errors.transcription}</span>}
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         name="russian"
//                         placeholder="введите перевод"
//                         value={newWord.russian}
//                         onChange={handleNewWord}
//                         className={errors.russian ? 'inputErrors' : ''}
//                     />
//                     {errors.russian && <span className="validationError">{errors.russian}</span>}
//                 </td>
//                 <td>
//                     <button onClick={handleAddNewWord}>добавить новое слово</button>
//                 </td>
//             </tr>
//         </>
//     );
// });

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import wordsStore from '../../../store/WordsStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddNewWord.css';

export const AddNewWord = observer(({ newWord, setNewWord, englishRegex, transcriptionRegex, russianRegex }) => {
    const [errors, setErrors] = useState({ english: '', transcription: '', russian: '' });

    const handleNewWord = (e) => {
        const { name, value } = e.target;
        setNewWord((prevValue) => ({ ...prevValue, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    //добавление слова
    const handleAddNewWord = async () => {
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

        if (hasError) {
            setErrors(newErrors);
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
            await wordsStore.addNewWord(newWordObject);
            console.log('Слово добавлено');
            toast('Изменения сохранены, новое слово добавлено', {
                className: 'toast-message',
            });
            wordsStore.dictionary = [...wordsStore.dictionary, newWordObject];
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
                        className={errors.english ? 'inputErrors' : ''}
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
                        className={errors.transcription ? 'inputErrors' : ''}
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
});
