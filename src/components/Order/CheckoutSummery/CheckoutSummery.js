import React from 'react'
import './CheckoutSummery.css'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'

const CheckoutSummery = props => {
    return (
        <div className="CheckoutSummary">
            <h1>Here, Hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
                <Button btnType="Danger" clicked={props.checkoutCanelled}>Cancel</Button>
                <Button btnType="Success" clicked={props.checkoutContiued}>Continue</Button>
            </div>
        </div>
    )
}

export default CheckoutSummery
