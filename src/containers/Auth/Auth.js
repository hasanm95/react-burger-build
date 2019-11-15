import React, {useState, useEffect} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import './Auth.css';
import {auth, authRedirectPath} from '../../store/actions'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom';
 
const Auth = () => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'Password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    }) 
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    const onAuthStart = (email, password) => {
        dispatch(auth(email, password, isSignUp))
    }
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const isAuthenticated = useSelector(state => state.auth.idToken);
    // const redirectPath = useSelector(state => state.auth.authRedirectPath)
    // const building = useSelector(state => state.burgerBuilder.building)

    // useEffect(() => {
    //     console.log(building);
    //     console.log(redirectPath);
    //     console.log(isAuthenticated);
    // })

    console.log(isAuthenticated);

    const errorMessage = error ? <p>{error.message}</p> : '';

    const onSubmitHandler = event => {
        event.preventDefault();
        const {email, password} = authForm;
        onAuthStart(email.value, password.value)
        
    }

    const onChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }
        }
        let isFormValid = true;
        for(let input in updatedControls){
            isFormValid = updatedControls[input].valid && isFormValid;
        }
        setAuthForm(updatedControls)
        setFormIsValid(isFormValid)
    }

    const checkValidity = (value, rules) => {
        let isValid = true;
        
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(prevState => !prevState)
    }

    const formElementArray = [];
    for(let key in authForm){
        formElementArray.push({
            id: key,
            config: authForm[key]
        })
    }

    let authenticated = <Redirect to='/checkout'/>;
    // if(isAuthenticated){
    //     authenticated = <Redirect to={redirectPath}/>
    // }

    

    let form = (
        <form onSubmit={onSubmitHandler}>
            {
                formElementArray.map(formElement => {
                    const {id, config: {elementType, value, valid, touched, elementConfig}} = formElement;
                    return <Input 
                        key={id}
                        elementType={elementType} 
                        elementConfig={elementConfig}
                        value={value}
                        invalid={!valid}
                        touched={touched}
                        changed={(event) => onChangeHandler(event, id)}
                    />
                })
            }
            <Button disabled={!formIsValid} btnType="Success">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
        </form>
    )
    if(loading){
        form = <Spinner/>
    }

    return (
        <div className="Auth">
            {errorMessage}
            {form}
            <Button clicked={switchAuthModeHandler} btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )

}

export default Auth;