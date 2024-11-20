import { makeAutoObservable, runInAction } from 'mobx';
import backUp from '../backUp.json';

class WordsStore {
    dictionary = [];
    isLoading = false;
    randomWord = null;

    constructor() {
        makeAutoObservable(this);
        this.fetchWords();
    }

    fetchWords = () => {
        this.isLoading = true;
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((data) => {
                this.dictionary = data;
                this.getRandomWord();
            })
            .catch((error) => {
                console.error('Error fetching words:', error);
                this.dictionary = backUp;
            })
            .finally(() => {
                runInAction(() => {
                    this.isLoading = false;
                });
            });
    };

    getRandomWord = () => {
        let randomIndex = Math.floor(Math.random() * this.dictionary.length);
        this.randomWord = this.dictionary[randomIndex];
    };

    addNewWord = (newWord) => {
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
                runInAction(() => {
                    this.dictionary.push(addedWord);
                });
            })
            .catch((error) => {
                console.error('Ошибка:', error.message);
            });
    };

    deleteWord = (id) => {
        fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
            method: 'POST',
        })
            .then((response) => {
                if (response.ok) {
                    runInAction(() => {
                        this.dictionary = this.dictionary.filter((item) => item.id !== id);
                    });
                } else {
                    throw new Error('Ошибка удаления слова');
                }
            })

            .catch((error) => {
                console.error('Ошибка удаления слова', error);
            });
    };

    updateWord = (updatedWord) => {
        fetch(`http://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}/update`, {
            method: 'POST',
            body: JSON.stringify(updatedWord),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response.json());
                    return response.json();
                } else {
                    console.log('Response Status:', response.status);
                    throw new Error('Ошибка редактирования слова');
                }
            })
            .then((updatedWordResponse) => {
                runInAction(() => {
                    this.dictionary = this.dictionary.map((word) => (word.id === updatedWordResponse.id ? updatedWordResponse : word));
                });
            })
            .catch((error) => {
                console.error('Ошибка:', error.message);
            });
    };
}

const wordsStore = new WordsStore();
export default wordsStore;
