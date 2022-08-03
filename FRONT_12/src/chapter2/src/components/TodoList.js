import React, {memo} from "react";

function TodoList({todos, setTodos}) {
    function finishTodo(id) {
        setTodos(prevState => {
            const index = prevState.findIndex(todo => todo.id === id);
            prevState[index].isDone = !prevState[index].isDone;
            return [...prevState];
        })
    }

    function deleteTodo(id) {
        setTodos(prevState => prevState.filter(todo => todo.id !== id));
    }

    return (
        <>
            {todos.map(todo => (
                <div key={todo.id} className="box is-flex is-justify-content-space-between is-align-items-center">
                    <label className={`checkbox ${todo.isDone && 'line-through'}`}>
                        <input
                            type="checkbox"
                            checked={todo.isDone}
                            className="mr-2"
                            onChange={() => finishTodo(todo.id)}
                        />
                        {todo.task}
                    </label>
                    <span className="icon" onClick={() => deleteTodo(todo.id)}>
                        X
                    </span>
                </div>
            ))}
        </>
    )
}

export default memo(TodoList);