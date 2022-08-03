import Header from "../../components/Header/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function MyVacancies() {
    const [vacancies, setVacancies] = useState([]);
    let authData = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        axios.get('http://localhost:3000/vacancies')
            .then(res => {
                if (res.data) {
                    const filteredData = res.data.data.filter(item => {
                        return item.responders?.includes(authData.data.id);
                    })

                    setVacancies([...filteredData]);
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
                <h2><Link to={`/vacancies/${item.id}`}>{item.title}</Link></h2>
                <p>{item.description.substring(0, 200)}...</p>
            </div>
        );
    });

    return (
        <>
            <Header />
            <div className="container py-3">
                <h2 className="pb-2 border-bottom">My vacancies</h2>
                {renderedVacancies}
            </div>
        </>
    )
}