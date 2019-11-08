import React, {Fragment} from 'react'
import Button from '../../UI/Button/Button'
import { useSelector } from "react-redux"


const OrderSummery = props => {
    const ingredientSummery = Object.keys(props.ingredients)
        .map((igKey, i) => (
            <li key={igKey+i}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        ))
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p><strong>Total Price:</strong> {price}</p>
            <p>Continue to checkout</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContiued}>Continue</Button>
        </Fragment>
    )
}

export default OrderSummery
