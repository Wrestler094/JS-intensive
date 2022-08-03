import Header from "../../components/Header/Header";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

function CreateVacancy() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [englishLevel, setEbglishLevel] = useState('');
    const [grade, setGrade] = useState('');
    const [tags, setTags] = useState('');
    const authData = JSON.parse(localStorage.getItem('auth'));

    function handleSubmit(evt) {
        evt.preventDefault();
        let isFilled = true;

        if (!title) {
            isFilled = false;
            alert("Название вакансии обязательно для заполнения");
        }
        if (!description && isFilled) {
            isFilled = false;
            alert("Описание вакансии обязательно для заполнения");
        }
        if (!englishLevel && isFilled) {
            isFilled = false;
            alert("Уровень английского не выбран");
        }
        if (!grade && isFilled) {
            isFilled = false;
            alert("Грейд не выбран");
        }

        if (isFilled) {
            axios.post('http://localhost:3000/vacancies', {
                title: title,
                description: description,
                englishLevel: englishLevel,
                grade: grade,
                tags: tags,
                creator: authData.data.id,
            })
                .then(res => {
                    window.location.href = `/active-vacancies/${res.data.data.id}`;
                })
                .catch(err => {
                    console.log(err);
                    alert('Something went wrong');
                })
        }
    }

    return (
        <>
            <Header/>
            <div className="container pt-2">
                <h2 className="pb-2 border-bottom py-2">Create vacancy</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupTitle">
                        <Form.Label>Vacancy title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter vacancy title"
                            value={title}
                            autoComplete="off"
                            onChange={evt => setTitle(evt.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDescription">
                        <Form.Label>Vacancy description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Enter vacancy description"
                            value={description}
                            autoComplete="off"
                            onChange={evt => setDescription(evt.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEnglishLevel">
                        <Form.Label>English level</Form.Label>
                        <Form.Select
                            value={englishLevel}
                            onChange={evt => setEbglishLevel(evt.target.value)}
                        >
                            <option value="0">Choose english level</option>
                            <option value="1">Beginner</option>
                            <option value="2">Intermediate</option>
                            <option value="3">Advanced</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupGrade">
                        <Form.Label>Grade</Form.Label>
                        <Form.Select
                            value={grade}
                            onChange={evt => setGrade(evt.target.value)}
                        >
                            <option value="0">Choose grade</option>
                            <option value="1">Junior</option>
                            <option value="2">Middle</option>
                            <option value="3">Senior</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupTags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter tags (Use commas to separate tags)"
                            value={tags}
                            autoComplete="off"
                            onChange={evt => setTags(evt.target.value)}
                        />
                    </Form.Group>
                    <div className={"text-center"}>
                        <Button className={"px-4"} variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default CreateVacancy;
