import {
    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL,
    AUTH_LOGOUT,
    AUTH_REDIRECT_PATH} from './types';

import axios from 'axios';

export const authStart = () => {
    return {
        type: AUTH_START
    }
}
   
export const authSuccess = (idToken, localId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: idToken, 
        userId: localId
    }
}

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expiresIn => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000)
    }
}


export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDW35NpjJQJONf7egnNGtWv8uZVqjfm7bI';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDW35NpjJQJONf7egnNGtWv8uZVqjfm7bI';
        }
        axios.post(url, authData)
        .then(response => {
            const {idToken, localId, expiresIn} = response.data;
            const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
            localStorage.setItem('token', idToken);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('userId', localId);
            dispatch(authSuccess(idToken, localId))
            dispatch(checkAuthTimeout(expiresIn))
        })
        .catch(err => dispatch(authFail(err.response.data.error)))
    }
}

export const authRedirectPath = path => {
    return{
        type: AUTH_REDIRECT_PATH,
        path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }else{
            const expireTime = new Date(localStorage.getItem('expirationTime'));
            if(expireTime <= new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expireTime.getTime() - new Date().getTime())/1000))
            }
        }
    }
}




