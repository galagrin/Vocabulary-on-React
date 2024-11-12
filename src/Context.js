import { createContext, useEffect, useState } from 'react';

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
            .then((data) => setDictionary(data))
            .catch((error) => {
                console.error('Error fetching words:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dictionary]);

    if (isLoading) {
        return;
    }

    return <Context.Provider value={{ dictionary, isLoading, setDictionary }}>{props.children}</Context.Provider>;
};
