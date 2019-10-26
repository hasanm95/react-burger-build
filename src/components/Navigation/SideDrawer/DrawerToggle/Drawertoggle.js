import React from 'react'
import './DrwerToggle.css'

const Drawertoggle = props => {
    return (
        <div className="DrawerToggle" onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Drawertoggle
