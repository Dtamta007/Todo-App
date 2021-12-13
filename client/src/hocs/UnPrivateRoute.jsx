import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export default function UnPrivateRoute({children}) {
    console.log(children);
    const {isAuthenticated} = useContext(AuthContext);

    if(isAuthenticated) {
        return <Navigate replace to='/' />
    }
    return children

}
