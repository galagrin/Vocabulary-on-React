import { render, screen, waitFor } from "@testing-library/react";
import { ContextProvider, Context } from "./Context";
import { useContext } from "react";
import React from "react";

const TestComponent = () => {
    const { dictionary, addNewWord, deleteWord, updateWord } = useContext(Context);

    return (
        <>
            <div data-testid="cards">{dictionary.length}</div>
            <button onClick={() => addNewWord({ word: "test2" })}>Add</button>
            <button onClick={() => deleteWord(1)}>Delete</button>
            <button onClick={() => updateWord({ word: "updated" }, 1)}>Update</button>
        </>
    );
};

describe("ContextProvider", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        fetch.mockClear();
    });

    // get cards before component mounting testing

    test("get cards before component mounting", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 1,
                    word: "test",
                },
            ],
        });

        render(
            <ContextProvider>
                <TestComponent />
            </ContextProvider>
        );

        await waitFor(() => {
            const element = screen.getByTestId("cards");
            expect(element.textContent).toBe("1");
        });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("http://itgirlschool.justmakeit.ru/api/words");
    });

    // add new word testing
    test("add new card", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 2,
                    word: "test2",
                },
            ],
        });

        render(
            <ContextProvider>
                <TestComponent />
            </ContextProvider>
        );

        screen.getByText("Add").click();

        await waitFor(() => {
            const element = screen.getByTestId("cards");
            expect(element.textContent).toBe("1");
        });

        expect(fetch).toHaveBeenCalledWith(
            "http://itgirlschool.justmakeit.ru/api/words/add",
            expect.objectContaining({
                body: expect.any(String),
                headers: expect.any(Object),
                method: "POST",
                mode: "no-cors",
            })
        );
    });

    // update word testing

    test("update card", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: 1,
                word: "updated",
            }),
        });

        render(
            <ContextProvider>
                <TestComponent />
            </ContextProvider>
        );

        // иммитация клика по кнопке
        screen.getByText("Update").click();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                "http://itgirlschool.justmakeit.ru/api/words/1/update",
                expect.any(Object)
            );
        });
    });

    test("delete word", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: 1,
                word: "deleted",
            }),
        });

        render(
            <ContextProvider>
                <TestComponent />
            </ContextProvider>
        );

        // иммитация клика по кнопке
        screen.getByText("Delete").click();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                "http://itgirlschool.justmakeit.ru/api/words/1/delete",
                expect.any(Object)
            );
        });
    });
});
