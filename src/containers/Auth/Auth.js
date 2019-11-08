import React, {useState} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import './Auth.css';
import {auth} from '../../store/actions'
import {useSelector, useDispatch} from 'react-redux'

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
    const dispatch = useDispatch();

    const onAuthStart = (email, password) => {
        dispatch(auth(email, password))
    }

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



    const formElementArray = [];
    for(let key in authForm){
        formElementArray.push({
            id: key,
            config: authForm[key]
        })
    }
    const form = (
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
            <Button disabled={!formIsValid} btnType="Success">Sign Up</Button>
        </form>
    )

    return (
        <div className="Auth">
            {form}
        </div>
    )

}

export default Auth;