import React, {useState} from 'react'
import Button from '../../../components/UI/Button/Button'
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Zipcode'
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
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
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validation: {
                required: true
            },
            valid: true
        }
    }) 
    const [loading, setLoading] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false);
    const orderHandler = event => {
        event.preventDefault();
        setLoading(true);
        const formData = {};
        for(let formEl in orderForm){
            formData[formEl] = orderForm[formEl].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
        .then(response => {
            setLoading(false);
            props.history.push('/orders')
        })
        .catch(error => {
            setLoading(false);
        })
    }

    const onChangeHandler = (event, inputindentifier) => {
        const updatedForm = {...orderForm};
        const updatedFormEl = {...updatedForm[inputindentifier]}
        updatedFormEl.value = event.target.value;
        updatedFormEl.touched = true;
        updatedFormEl.valid = checkValidity(updatedFormEl.value, updatedFormEl.validation);
        updatedForm[inputindentifier] = updatedFormEl;
        let isFormValid = true;
        for(let input in updatedForm){
            isFormValid = updatedForm[input].valid && isFormValid;
        }
        setOrderForm(updatedForm);
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
    for(let key in orderForm){
        formElementArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
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
            <Button disabled={!formIsValid} btnType="Success">Order</Button>
        </form>
    )

    if(loading){
        form = <Spinner/>
    }

    return (
        <div className="ContactData">
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
    )
}

export default ContactData
