import "./Table.css";
import data from "../../data.json";

export default function Table() {
    let wordEditing = false;

    return (
        <table>
            <tr>
                <th>Английский</th>
                <th>Транскрипция</th>
                <th>Перевод</th>
                <th></th>
            </tr>
            {data.map((item) => (
                <tr key={item.id}>
                    {wordEditing ? (
                        <>
                            <td><input type="text" defaultValue={item.english} /></td>
                            <td><input type="text" defaultValue={item.transcription} /></td>
                            <td><input type="text" defaultValue={item.russian} /></td>
                            <td>
                                <button>сохранить</button>
                                <button>отменить</button>
                            </td>
                        </>
                    ) : (
                        <>
                            <td>{item.english}</td>
                            <td>{item.transcription}</td>
                            <td>{item.russian}</td>
                            <td>
                                <button>редактировать</button>
                                <button>удалить</button>
                            </td>
                        </>
                    )}
                </tr>
            ))}
        </table>
    );
}


