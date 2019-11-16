import React, {useEffect, useState} from 'react'
import useForm from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import {auth, authRedirectPath} from '../../store/actions/auth'
import './Auth.css';
 
const Auth = () => {
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur'
    });
    const [isSignUp, setIsSignUp] = useState(true);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const redirectPath = useSelector(state => state.auth.authRedirectPath);
    const building = useSelector(state => state.burgerBuilder.building);
    const dispatch = useDispatch();
    const onSubmitHandler = (data) => {
        const {email, password} = data;
        dispatch(auth(email, password, isSignUp))
    }
    useEffect(() => {
        if(isAuthenticated){
            setIsSignUp(isAuthenticated);
        }
        if(!building && redirectPath !== '/'){
            dispatch(authRedirectPath('/'))
        }
    }, [isAuthenticated, building, redirectPath, dispatch]);

    const switchAuthModeHandler = () => {
        setIsSignUp(prevState => !prevState)
    }

    let errorMessage = error ? <p>{error.message}</p> : '';
    let form = <Spinner/>;
    if(!loading){
        form = <div className="form__wrapper">
                <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="form__group">
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            className="form__input"
                            ref={register({
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "invalid email address"
                                }
                            })}
                        />
                        <p className="form__error">{errors.email && errors.email.message}</p>
                    </div>
                    <div className="form__group">
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="form__input"
                            ref={register({
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: "Minimum Value is 6"
                                },
                                maxLength: {
                                    value: 8,
                                    message: "Maximum Value is 8"
                                }
                            })}
                        />
                        <p className="form__error">{errors.password && errors.password.message}</p>
                    </div>
                    <div className="form__group">
                        <Button btnType="Success">Submit</Button>
                    </div>
                </form>
            </div>
    }
    let authRedirect = null;
    if(isAuthenticated){
        authRedirect = <Redirect to={redirectPath}/>
    }

    return (
        <div className="Auth">
            {authRedirect}
            {errorMessage}
            {form}
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )
}

export default Auth; 