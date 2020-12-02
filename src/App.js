import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

    const [data, setData] = useState([]);
    const [dataWordLength, setdataWordLength] = useState([]);
    const [targetValue, setTargetValue] = useState();
    const [checkboxValue, setCheckboxValue] = useState(false);

    const getData = useCallback(async () => {
        try {
            const res = await axios.get('https://cors-anywhere.herokuapp.com/http://mrsoft.by/data.json');
            setData(res.data.data);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [])

    const setValue = e => {
        setTargetValue(e.target.value);
    }

    const checkbox = e => {
        setCheckboxValue(e.target.checked);
    }

    const wordLength = () => {
        const newData = data.filter(val => val.length > Number(targetValue));
        setdataWordLength(newData);
    }

    const Substring = () => {
        let newData = [];
        if (checkboxValue) {
            newData = data.filter(val => val.indexOf(`${targetValue}`) !== -1);
        } else {
            newData = data.filter(val => val.toLowerCase().indexOf(`${targetValue.toLowerCase()}`) !== -1);
        }
        setdataWordLength(newData);
    }

    return (
        <div className="container">
            <div>
                <input type='text' onChange={setValue} />
                <input type="checkbox" onChange={checkbox} />
                <button onClick={wordLength}>Длинна слова</button>
                <button onClick={Substring}>Подстрока</button>
            </div>
            <div className="text_container">
                {
                    data.length && !dataWordLength.length ? data.join(', ') : dataWordLength.join(', ')
                }
            </div>
        </div>
    );
}

export default App;
