import React, {useState, useEffect} from 'react'
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'
import Spinner from '../../components/UI/Spinner/Spinner'

const Checkout = props => {
    const [ingredients, setIngredients] = useState(null)
    const [price, setPrice] = useState(4);

    useEffect(() => {
        const query = new URLSearchParams(props.location.search)
        const queryIngredients = {};
        let totalPrice = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                totalPrice = param[1]
            }else{
                queryIngredients[param[0]] = +param[1]
            }
        }
        setIngredients(queryIngredients);
        setPrice(totalPrice);
    },[])

    const checkoutCanelledHandler = () => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let contactData = <Spinner/>;
    let checkoutSummery = null;
    if(ingredients){
        checkoutSummery = <CheckoutSummery 
            ingredients={ingredients}
            checkoutCanelled={checkoutCanelledHandler}
            checkoutContiued={checkoutContinuedHandler}
        />
        contactData = <Route 
        path={props.match.path + '/contact-data'} 
        render={(props) => <ContactData ingredients={ingredients} price={price} {...props}/>}/>
    }

    return (
        <div>
            {checkoutSummery}
            {contactData}
        </div>
    )
}

export default Checkout
