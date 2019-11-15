import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'


const NavigationItems = props => {
  return (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {
          props.isAuthenticated ? 
          <NavigationItem link="/orders">Orders</NavigationItem> : ''
        }
        {
          props.isAuthenticated ? 
          <NavigationItem link="/logout">Logout</NavigationItem> : 
          <NavigationItem link="/auth">Authenticate</NavigationItem>
        }
        
    </ul>
  )
}

export default NavigationItems
