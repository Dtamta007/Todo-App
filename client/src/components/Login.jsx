import React, {useState, useRef, useContext} from 'react'
import {AuthContext} from '../context/AuthContext';
import AuthServices from '../services/AuthServices';
import { useNavigate } from 'react-router-dom';
import Message from './Message';

export default function Login() {
    
    const [user,setUser] = useState({username: "", password: ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    const username = useRef("")
    const password = useRef("")
    const navigate = useNavigate();
    
    const handleChange = e =>{
        let userData = {
            username : username.current.value,
            password : password.current.value
        }
        setUser(userData);
        // console.log(user);
    }
    
    const handleSubmit = e =>{
        e.preventDefault();
        AuthServices.login(user).then(data=>{
            console.log("LOGIN: ", data);
            const {isAuthenticated, user, message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                navigate('/todos');
            }else{
                setMessage(message);
            }
            setUser(data.user);
        });
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Please Sign In</h3>
          <label htmlFor="username" className="sr-only">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            name="username"
            onChange={handleChange}
            ref={username}
          />
          <label htmlFor="username" className="sr-only">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
            ref={password}
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Log In
          </button>
        </form>
        {message ? <Message message ={message} /> : null}
      </div>
    );
}
