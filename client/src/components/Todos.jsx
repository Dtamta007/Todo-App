import React, {useState, useContext, useEffect} from 'react';
import TodoItem from './TodoItem';
import TodoServices from '../services/TodoServices';
import {AuthContext} from '../context/AuthContext';
import Message from './Message';

export default function Todos() {
    const [todo,setTodo] = useState({name: ""});
    const [todos, setTodos] = useState([]);
    const [message,setMessage] = useState(null);

    const authContext = useContext(AuthContext);
    useEffect(()=>{
        TodoServices.getTodos().then(data=>{
            setTodos(data.todos);
        })
    },[]);

    const handleSubmit = e =>{
        e.preventDefault();
        TodoServices.postTodo(todo).then(data=>{
            const {message} = data;
            resetForm();
            if(!message.msgError){
                TodoServices.getTodos().then(data =>{
                    setTodos(data.todos);
                    setMessage(message);
                });
            }else if(message.msgBody === 'Unauthorized'){
                setMessage(message);
                authContext.setUser({username: "", role: ""});
                authContext.setIsAuthenticated(false);
            }else{
                setMessage(message);
            }
        })
    }

    const handleChange = (e) =>{
        setTodo({name: e.target.value})
    }

    const resetForm =() =>{
        setTodo({name: ""});
    }

    return (
      <div>
        <ul className="list-group">
          {todos.map((todo) => {
            return <TodoItem key={todo._id} todo={todo} />;
          })}
        </ul>
        <br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="todo">Enter Todo</label>
          <input
            type="text"
            name="todo"
            placeholder="Enter Todo Here"
            value={todo.name}
            onChange={handleChange}
            className="form-control"
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
        </form>
        {message ? <Message message={message}/> : null }
      </div>
    );
}
