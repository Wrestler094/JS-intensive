import {Button, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function CompanySignup() {
    const [company, setCompany] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();

        if (company.length) {
            if (login.length) {
                if (password.length > 2) {
                    if (password === repassword) {
                        axios.post('http://localhost:3000/signup',{
                            login: login,
                            password: password,
                            isCompany: true,
                            companyName: company
                        })
                            .then(res => {
                                if (res.data.res === true) {
                                    window.location.href = "/login";
                                } else {
                                    alert(res.data.err.errors[0].message);
                                }
                            })
                            .catch(err => {
                                alert("Something went wrong");
                                console.log(err);
                            });
                    } else {
                        alert("Введенные пароли не совпадают");
                    }
                } else {
                    alert("Пароль должен содержать минимум 3 символа");
                }
            } else {
                alert("Поле логин обязательно для заполнения");
            }
        } else {
            alert("Поле с названием компании обязательно для заполнения");
        }
    }

    return (
        <Container fluid>
            <Row className={"row justify-content-center mt-3"}>
                <h1 className={"text-center"}>BV</h1>
                <Form className={"col-12 col-sm-8 col-md-6 col-lg-4 mt-3"} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupCompany">
                        <Form.Label>Company name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter company name"
                            value={company}
                            autoComplete="on"
                            onChange={evt => setCompany(evt.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupLogin">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter login"
                            value={login}
                            autoComplete="on"
                            onChange={evt => setLogin(evt.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupRepassword">
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repeat password"
                            autoComplete="off"
                            value={repassword}
                            onChange={evt => setRepassword(evt.target.value)}
                        />
                    </Form.Group>
                    <p className={"text-center my-4"}>
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                    <div className={"text-center"}>
                        <Button className={"px-4"} variant="primary" type="submit">
                            Sign up
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    );
}

export default CompanySignup;
