import React from 'react'
import './Input.css';

const Input = props => {
    let inputElement = null;
    switch(props.elementType){
        case 'text':
            inputElement = <input 
                            className="InputElement" 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
            break;
        case 'textarea':
            inputElement = <textarea 
                            className="InputElement" 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}></textarea>;
            break;
        case 'select':
            inputElement = <select
                            className="InputElement"
                            value={props.value}
                            onChange={props.changed}>
                            {props.elementConfig.options.map(el => (
                                <option value={el.value} key={el.value}>{el.displayValue}</option>
                            ))}
            </select>;
            break;
        default:
            inputElement = <input 
                            className="InputElement" 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input
