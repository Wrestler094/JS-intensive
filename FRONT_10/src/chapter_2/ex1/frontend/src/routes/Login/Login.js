import {Button, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();

        if (login.length) {
            if (password.length) {
                axios.post('http://localhost:3000/login',{
                    login: login,
                    password: password
                })
                    .then(res => {
                        if (res.data.res === true) {
                            localStorage.setItem('auth', JSON.stringify({
                                data: res.data.data
                            }))
                            window.location.href = "/vacancies";
                        } else {
                            alert(res.data.err.errors[0].message);
                        }
                    })
                    .catch(err => {
                        alert("Something went wrong");
                        console.log(err);
                    });
            } else {
                alert("Поле с паролем обязательно для заполнения");
            }
        } else {
            alert("Поле логин обязательно для заполнения");
        }
    }

    return (
        <Container fluid>
            <Row className={"row justify-content-center mt-3"}>
                <h1 className={"text-center"}>BV</h1>
                <Form
                    className={"col-12 col-sm-8 col-md-6 col-lg-4 mt-3"}
                    onSubmit={handleSubmit}
                >
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
                            value={password}
                            autoComplete="off"
                            onChange={evt => setPassword(evt.target.value)}
                        />
                    </Form.Group>
                    <p className={"text-center my-4"}>
                        New to BestVacancies? <Link to="/signup">Create an account</Link>
                    </p>
                    <div className={"text-center"}>
                        <Button className={"px-4"} variant="primary" type="submit">
                            Sign in
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    );
}

export default Login;
