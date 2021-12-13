import React, {useState, useRef, useEffect} from 'react'
import AuthServices from '../services/AuthServices';
import { useNavigate } from 'react-router-dom';
import Message from './Message';

export default function Register() {
    
    const [user,setUser] = useState({username: "", password: "", role: ""});
    const [message,setMessage] = useState(null);
   let timerID = useRef(null);

   useEffect(()=>{
       return () =>{
           clearTimeout(timerID);
       }
   },[]);
    const username = useRef("")
    const password = useRef("")
    const role = useRef("")
    const navigate = useNavigate();
    
    const handleChange = e =>{
        let userData = {
            username : username.current.value,
            password : password.current.value,
            role : role.current.value
        }
        setUser(userData);
    }

    const resetForm = () =>{
        setUser({username: "", password: "", role: ""});
    }
    
    const handleSubmit = e =>{
        e.preventDefault();
        AuthServices.register(user).then(data=>{
            const {message} = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    navigate('/login');
                },2000); 
            }
            setUser(data.user);
        });
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Please Sign Up</h3>
          <label htmlFor="username" className="sr-only">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            name="username"
            value={user.username}
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
            value={user.password}
            onChange={handleChange}
            ref={password}
          />
          <label htmlFor="username" className="sr-only">
            Role:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Select a Role (Admin/User)"
            name="role"
            value={user.role}
            onChange={handleChange}
            ref={role}
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Register
          </button>
        </form>
        {message ? <Message message ={message} /> : null}
      </div>
    );
}
