import Header from "../../components/Header/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Vacancies() {
    const [vacancies, setVacancies] = useState([]);
    let authData = JSON.parse(localStorage.getItem('auth'));
    const isCompany = authData.data.isCompany;

    useEffect(() => {
        axios.get('http://localhost:3000/vacancies')
            .then(res => {
                if (res.data) {
                    setVacancies([...res.data.data]);
                    console.log(res.data.data);
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong")
            })
    }, []);

    const renderedVacancies = vacancies.map(item => {
        return (
            <div key={item.id} className="feature col py-2">
                <div className={"d-flex align-items-center justify-content-between"}>
                    <h2><Link to={`${item.id}`}>{item.title}</Link></h2>
                    {!isCompany && item.responders && item.responders.includes(authData.data.id) &&
                        <span className={"text-success"}>You responded</span>
                    }
                </div>
                <p>{item.description.substring(0, 200)}...</p>
            </div>
        );
    });

    return (
        <>
            <Header/>
            <div className="container py-3">
                <h2 className="pb-2 border-bottom">All vacancies</h2>
                    {renderedVacancies}
            </div>
        </>
    );
}

export default Vacancies;
