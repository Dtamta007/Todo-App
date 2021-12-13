import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthServices from '../services/AuthServices';
import {AuthContext} from '../context/AuthContext';

export default function Navbar() {

    const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(AuthContext);
    console.log("USER: ", user);
    const onClickLogoutHandler = () =>{
        AuthServices.logout().then(data =>{
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        })
    }

    const unauthenticatedNavbar = () =>{
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/login">
                    <li className="nav-item nav-link">
                        Login
                    </li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">
                        Register
                    </li>
                </Link>
            </>
        )
    };

    const authenticatedNavbar = () =>{
        return (
          <>
            <Link to="/">
              <li className="nav-item nav-link">Home</li>
            </Link>
            <Link to="/todos">
              <li className="nav-item nav-link">Todos</li>
            </Link>
            {
                user.role === "admin" ?
                <Link to="/admin">
                    <li className="nav-item nav-link">Admin</li>
                </Link> : null
            }
            <button className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>
                Logout
            </button>
          </>
        );
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <Link to="/home">
            <div className="navbar-brand">
                Todo-App
            </div>
        </Link>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
            </ul>
          </div>
        </div>
      </nav>
    );
}
