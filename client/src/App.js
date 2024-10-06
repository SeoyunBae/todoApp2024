import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:7000/api/todos');
        setTodos(response.data);
    };

    const addTodo = async () => {
        const response = await axios.post('http://localhost:7000/api/todos', { name: newTodo });
        setTodos([...todos, response.data]);
        setNewTodo('');
    };

    const updateTodo = async (id, complete) => {
        const response = await axios.put(`http://localhost:7000/api/todos/${id}`, { complete: !complete });
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:7000/api/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    return (
        <div>
            <h1>Todo App</h1>
            <input 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
                placeholder="Add a new task" 
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <input 
                            type="checkbox" 
                            checked={todo.complete} 
                            onChange={() => updateTodo(todo._id, todo.complete)} 
                        />
                        {todo.name}
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
