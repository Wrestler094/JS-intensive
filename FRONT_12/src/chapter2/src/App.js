import React, {useState} from 'react';
import TodoList from "./components/TodoList";

export default function App() {
    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState([]);

    function submitHandler(evt) {
        evt.preventDefault();
        setTodos(prevState => [{
            id: Date.now(),
            task: todoInput,
            isDone: false
        }, ...prevState]);
        setTodoInput('');
    }

    return (
        <>
            <section className="hero is-primary block">
                <div className="hero-body">
                    <div className="container">
                        <p className="title has-text-centered">
                            Todo List
                        </p>
                        <form onSubmit={submitHandler}>
                            <input
                                className="input is-medium"
                                type="text"
                                placeholder="Write your task"
                                value={todoInput}
                                onChange={evt => setTodoInput(evt.target.value)}
                            />
                        </form>
                    </div>
                </div>
            </section>
            <div className="container">
                <TodoList todos={todos} setTodos={setTodos} />
            </div>
        </>
    )
}