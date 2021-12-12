import {useState, useEffect, createContext} from 'react';
import AuthServices from '../services/AuthServices';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(true);

    useEffect(() =>{
        AuthServices.isAuthenticated().then(data=>{
            setUser(data);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    },[]);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> : 
                <AuthContext.Provider value={{
                    user,
                    setUser,
                    isAuthenticated,
                    setIsAuthenticated
                }}>
                    {children}
                </AuthContext.Provider>
            }
        </div>
    )
}