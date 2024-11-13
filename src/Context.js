import { createContext, useEffect, useState } from 'react';
import { Loader } from './Components/Loader/Loader';

export const Context = createContext();

export const ContextProvider = (props) => {
    const [dictionary, setDictionary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((data) => {
                setDictionary(data);
            })
            .catch((error) => {
                console.error('Error fetching words:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dictionary]);

    const addNewWord = (newWord) => {
        fetch('http://itgirlschool.justmakeit.ru/api/words/add', {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify(newWord),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('Response Status:', response.status);
                    throw new Error('Ошибка добавления нового слова');
                }
            })
            .then((addedWord) => {
                setDictionary((prevDictionary) => [...prevDictionary, addedWord]);
            })
            .catch((error) => {
                console.error('Ошибка:', error.message);
            });
    };

    if (isLoading) {
        return <Loader />;
    }

    return <Context.Provider value={{ dictionary, isLoading, setDictionary, addNewWord }}>{props.children}</Context.Provider>;
};