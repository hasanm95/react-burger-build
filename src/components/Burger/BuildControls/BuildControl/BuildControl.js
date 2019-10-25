import React from 'react'
import './BuildControl.css'

const BuildControl = props => {
    return (
        <div className="BuildControl">
            <div className="Label">{props.label}</div>
            <button 
                className="less" 
                onClick={props.remove}
                disabled={props.disabled}
            >Less</button>
            <button 
                className="more" 
                onClick={props.added}
            >More</button>
        </div>
    )
}

export default BuildControl
