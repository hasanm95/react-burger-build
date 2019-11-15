import React from 'react'
import './Order.css'

const Order = props => {
    let ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    return (
        <div className="Order">
            <ul className="IngredientsList">
                {
                    ingredients.map(ig => {
                        return <li key={ig.name}><span>{ig.name}:</span><strong>{ig.amount}</strong></li>
                    })
                }
            </ul>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
