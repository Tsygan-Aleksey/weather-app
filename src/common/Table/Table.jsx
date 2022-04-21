import style from "./table.module.css";

export const TableWeather = (props) =>{
    return(<table>
        <tr>
            <th>температура</th>
            <th>ощущается как</th>
            <th>влажность</th>
        </tr>
        <tr>
            <td>{props.data.temp}</td>
            <td>{props.data.feels_like}</td>
            <td>{props.data.humidity}</td>
        </tr>
    </table>)
}
