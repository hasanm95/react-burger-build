import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label: 'Salad', type:"salad"},
    {label: 'Bacon', type:"bacon"},
    {label: 'Cheese', type:"cheese"},
    {label: 'Meat', type:"meat"},
]

const BuildControls = props => {
    return (
        <div className="BuildControls">
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map((ctrl, i) => (
                    <BuildControl 
                        label={ctrl.label} 
                        key={i}
                        added={() => props.addIngredients(ctrl.type)}
                        remove={() => props.removeIngredients(ctrl.type)}
                        disabled={props.disabledInfo[ctrl.type]}
                    />
                ))
            }
            <button 
                className="OrderButton" 
                disabled={!props.purchageAble}
                onClick={props.ordered}>Order Now</button>
            
        </div>
    )
}

export default BuildControls
