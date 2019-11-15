import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from '../../../store/actions'

const Logout = () => {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout())
    }
    useEffect(() => {
        onLogout()
    })

    return (
        <Redirect to="/"/>
    )
}

export default Logout;