import Header from "../../components/Header/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function ActiveVacancies() {
    const [activeVacancies, setActiveVacancies] = useState([]);
    const authData = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        axios.get(`http://localhost:3000/active-vacancies?id=${authData.data.id}`)
            .then(res => {
                if (res.data) {
                    setActiveVacancies([...res.data.data]);
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong")
            })
    }, []);

    const renderedVacancies = activeVacancies.map(item => {
        return (
            <div key={item.id} className="feature col py-2">
                <h2><Link to={`/vacancies/${item.id}`}>{item.title}</Link></h2>
                <p>{item.description.substring(0, 200)}...</p>
            </div>
        );
    });

    return (
        <>
            <Header/>
            <div className="container py-3">
                <h2 className="pb-2 border-bottom">Active vacancies</h2>
                {renderedVacancies}
            </div>
        </>
    )
}