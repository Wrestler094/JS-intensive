import React from 'react';
import devs from '../images/dev.jpeg'

function StudentInfo() {
    return <>
        <img className={"dev-photo"} src={devs} alt="Ковалев Михаил"/>
        <p>Senior developer (в перспективе)</p>
        <h2>Ковалев Михаил Михалович</h2>
        <p>28 лет</p>
    </>;
}

export default StudentInfo;