import Header from "../../components/Header/Header";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Vacancy() {
    const [vacancy, setVacancy] = useState([]);
    const [response, setResponse] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const params = useParams();
    const navigate = useNavigate()
    let authData = JSON.parse(localStorage.getItem('auth'));
    const isCompany = authData.data.isCompany;

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        axios.post(`http://localhost:3000/vacancies/${params.id}`)
            .then(res => {
                console.log(res.data)
                setVacancy([...res.data.data]);
                setIsOpen(res.data.data[0].isActive);
                if (res.data.data[0].responders && res.data.data[0].responders.includes(authData.data.id)) {
                    setResponse(true);
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong");
            })
    }, []);

    function handleRespond() {
        axios.put(`http://localhost:3000/vacancies/${params.id}`, {
            user: authData.data.id
        })
            .then(res => {
                if (res.data === 1) {
                    setResponse(!response);
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong");
            })
    }

    function closeVacancy() {
        axios.put(`http://localhost:3000/vacancies/${params.id}`, {
            isActive: false
        })
            .then(res => {
                console.log(res.data);
                if (res.data === 1) {
                    setIsOpen(false);
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong");
            })
    }

    const renderVacancy = vacancy.map(item => {
        return (
            <div key={item.id} className="row justify-content-between">
                <div className="text-lg-right">
                    <h6 className="mb-3"><div className={"link-primary"} onClick={goBack}>Back to vacancies</div></h6>
                </div>
                <div className="text-lg-right">
                    <h4 className="mb-3">{item.title}</h4>
                </div>
                <div className="text-lg-right">
                    <h6 className="mb-3">Grade: {item.grade}</h6>
                </div>
                <div className="text-lg-right">
                    <h6 className="mb-3">English level: {item.englishLevel}</h6>
                </div>
                <div>
                    <p>{item.description}</p>
                </div>
                <div className="text-lg-right">
                    <ul className="mb-4 list-group list-group-horizontal flex-wrap">
                        {renderTags(item.tags)}
                    </ul>
                </div>
                {!isCompany && !isOpen &&
                    <div className={"mb-4"}>
                        <button type="button" className={!isOpen && "btn btn-outline-secondary"} disabled={!isOpen}>
                            {!isOpen && "Vacancy is closed"}
                        </button>
                    </div>
                }
                {!isCompany && isOpen &&
                    <div className={"mb-4"}>
                        <button
                            type="button"
                            className={response ? "btn btn-outline-danger" : "btn btn-outline-primary"}
                            onClick={handleRespond}
                        >
                            {response ? "Cancel response" : "Respond for a vacancy"}
                        </button>
                    </div>
                }
                {isCompany &&
                    <>
                        <div className={"mb-4"}>
                            <button
                                type="button"
                                className={isOpen ? "btn btn-outline-danger" : "btn btn-outline-secondary"}
                                onClick={closeVacancy}
                                disabled={!isOpen}
                            >
                                {isOpen ? "Close Vacancy" : "Vacancy is closed"}
                            </button>
                        </div>
                        {item.responders &&
                            <>
                                <div className="text-lg-right">
                                    <h6 className="mb-3">Responders id</h6>
                                </div>
                                <div className="text-lg-right" style={{maxWidth: '300px'}}>
                                    <ul className="mb-4 list-group">
                                        {renderResponders(item.responders)}
                                    </ul>
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        )
    });

    function renderTags(tagsArray) {
        return tagsArray.map(tag => <li className={"list-group-item"} key={tag}>{tag}</li>)
    }

    function renderResponders(respondersArray) {
        return respondersArray.map(responder => <li className={"list-group-item"} key={responder}>{responder}</li>)
    }

    return (
        <>
            <Header/>
            <div className="container py-3">
                {renderVacancy}
            </div>
        </>
    )
}