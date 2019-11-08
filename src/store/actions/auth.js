import {
    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL} from './types';

import axios from 'axios';

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSuccess = authData => {
    return {
        type: AUTH_SUCCESS,
        authData
    }
}

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDW35NpjJQJONf7egnNGtWv8uZVqjfm7bI', authData)
        .then(response => {
            console.log(response);
            authSuccess(authData)
        })
        .catch(err => authFail(err))
    }
}