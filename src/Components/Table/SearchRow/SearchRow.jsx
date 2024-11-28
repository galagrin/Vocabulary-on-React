export const SearchRow = ({ onChange }) => {
    return (
        <tr>
            <td className="searchrow">
                <input type="text" placeholder="найти слово" onChange={onChange} />
            </td>
        </tr>
    );
};
