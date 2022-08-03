import React, { useState } from 'react';
import Stopwatch from "./Stopwatch/Stopwatch";
import StudentInfo from "./StudentInfo/StudentInfo";
import './App.css';

function App() {
    const [stopwatch, setStopwatch] = useState(false);
    const [studentInfo, setStudentInfo] = useState(true);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Главная страница</h1>
            </header>
            <main>
                {studentInfo ? <StudentInfo/>: null}
                {stopwatch ? <Stopwatch/> : null}
                <button className={"stopwatch-button menu-button"} onClick={() => setStopwatch(!stopwatch)}>Stopwatch</button>
                <button className={"student-info-button menu-button"} onClick={() => setStudentInfo(!studentInfo)}>StudentInfo</button>
            </main>
        </div>
    );
}

export default App;
