import React, {useState} from 'react'
import Button from '../../../components/UI/Button/Button'
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

const ContactData = props => {
    const [loading, setLoading] = useState(false)
    const orderHandler = event => {
        event.preventDefault();
        setLoading(true);
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            customer: {
                name: 'Hasan Mobarak',
                address: {
                    street: 'test street',
                    zipCode: '3343',
                    country: 'Bangladesh'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
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

    let form = (
        <form>
            <input className="Input" type="text" name="name" placeholder="Your Name"/>
            <input className="Input" type="text" name="email" placeholder="Your Email"/>
            <input className="Input" type="text" name="street" placeholder="Your Street"/>
            <input className="Input" type="text" name="postCode" placeholder="Your Postacod"/>
            <Button btnType="Success" clicked={orderHandler}>Order</Button>
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
