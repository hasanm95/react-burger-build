import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                userId: null
            }
        case actionTypes.AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state;
    }
}

export default reducer;