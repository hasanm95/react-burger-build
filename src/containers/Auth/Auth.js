import React from 'react'
import {useSelector} from 'react-redux';
import Form from '../../components/Form/Form'
import Spinner from '../../components/UI/Spinner/Spinner'
import './Auth.css';
 
const Auth = () => {
    const isAuthenticated = useSelector(state => state.auth.token)
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const errorMessage = error ? <p>{error.message}</p> : '';
    let form = <Form/>;
    if(loading){
        form = <Spinner/>;
    }
    // console.log(isAuthenticated);
    return (
        <div className="Auth">
            {form}
            {errorMessage}
        </div>
    )

}

export default Auth;