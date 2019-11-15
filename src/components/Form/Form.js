 import React, {useState, useEffect} from 'react'
 import useForm from 'react-hook-form'
 import {useSelector, useDispatch} from 'react-redux';
 import Button from '../UI/Button/Button'
 import {auth} from '../../store/actions/auth'
 import './Form.css'
 
const Form = props => {
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur'
    });
    const [isSignUp, setIsSignUp] = useState(true);
    const isAuthenticated = useSelector(state => state.auth.token !== null)
    const dispatch = useDispatch();
    console.log(isAuthenticated);
    const onSubmitHandler = (data) => {
        const {email, password} = data;
        dispatch(auth(email, password, isSignUp))
    }
    useEffect(() => {
        if(isAuthenticated){
            setIsSignUp(isAuthenticated);
        }
    }, [isAuthenticated])

    return (
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
     )
}
 
export default Form;