import React, {useContext} from 'react';
import {Navigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export default function PrivateRoute({children,roles}) {
    console.log(children);
    const {isAuthenticated,user} = useContext(AuthContext);

    if(!isAuthenticated) {
        return <Navigate replace to='/login' />
    }
    if(!roles.includes(user.role)){
        return <Navigate replace to='/' />
    }

    return children

}
