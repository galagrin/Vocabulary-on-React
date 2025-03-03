import { createContext, useEffect, useState } from "react";
import { Loader } from "../Components/Loader/Loader";
import React from "react";
export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [dictionary, setDictionary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://itgirlschool.justmakeit.ru/api/words")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong ...");
                }
            })
            .then((data) => {
                setDictionary(data);
            })
            .catch((error) => {
                console.error("Error fetching words:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dictionary]);

    const addNewWord = async (newWord) => {
        try {
            const response = fetch("http://itgirlschool.justmakeit.ru/api/words/add", {
                mode: "no-cors",
                method: "POST",
                body: JSON.stringify(newWord),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            if (!response.ok) {
                throw new Error("Ошибка добавления нового слова");
            } else {
                const addedWord = await response.json();
                setDictionary((prevDictionary) => [...prevDictionary, addedWord]);
                return addedWord;
            }
        } catch (error) {
            console.error("Ошибка");
        }
    };

    const deleteWord = async (id) => {
        try {
            const response = fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error("Ошибка удаления слова");
            } else {
                const newDictionary = [...dictionary].filter((item) => item.id !== id);
                setDictionary(newDictionary);
                return newDictionary;
            }
        } catch (error) {
            console.error("Ошибка удаления слова", error);
        }
    };

    const updateWord = async (updatedWord, id) => {
        try {
            const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
                method: "POST",
                body: JSON.stringify(updatedWord),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            if (!response.ok) {
                throw new Error("Ошибка редактирования слова");
            } else {
                const updatedWordResponse = await response.json();
                setDictionary((prevDictionary) =>
                    prevDictionary.map((word) => (word.id === updatedWordResponse.id ? updatedWordResponse : word))
                );
                return updatedWordResponse;
            }
        } catch (error) {
            console.error("Ошибка:", error.message);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Context.Provider value={{ dictionary, isLoading, setDictionary, addNewWord, deleteWord, updateWord }}>
            {children}
        </Context.Provider>
    );
};
