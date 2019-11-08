import React from 'react'
import { useSelector } from "react-redux"
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'
import Spinner from '../../components/UI/Spinner/Spinner'

const Checkout = props => {
    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const purchased = useSelector(state => state.order.purchased);
    const checkoutCanelledHandler = () => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let contactData = <Spinner/>;
    let checkoutSummery = null;
    let purchasedRedirect = null;
    if(ingredients){
        purchasedRedirect = purchased ? <Redirect to="/"/> : null;
        checkoutSummery = <CheckoutSummery 
            ingredients={ingredients}
            checkoutCanelled={checkoutCanelledHandler}
            checkoutContiued={checkoutContinuedHandler}
        />
        contactData = <Route 
        path={props.match.path + '/contact-data'} 
        component={ContactData}/>
    }

    return (
        <div>
            {purchasedRedirect}
            {checkoutSummery}
            {contactData}
        </div>
    )
}

export default Checkout
