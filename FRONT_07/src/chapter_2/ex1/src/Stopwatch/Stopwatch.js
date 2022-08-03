import React, {useEffect, useState} from 'react';
import {countNewTime} from "../helpers/countNewTime";
import SomeList from "../SomeList/SomeList";

function Stopwatch() {
    const [time, setTime] = useState("00:00:00");
    const [listItems, setListItems] = React.useState([]);
    const renderItems = listItems.map(time => <SomeList time={time}/>);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(countNewTime(time.split(':')));
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [time]);

    function handleAddClick() {
        setListItems(prevList => [...prevList, time]);
    }

    return  <>
        <h2>Секундомер</h2>
        <p>{time}</p>
        <div>
            <button className={"menu-button"} onClick={handleAddClick}>Add</button>
            <button className={"menu-button"} onClick={() => setListItems([])}>Reset</button>
        </div>
        {listItems.length ? <><h3>List items</h3><ul className={"list"}>{renderItems}</ul></> : null}
    </>;
}

export default Stopwatch;