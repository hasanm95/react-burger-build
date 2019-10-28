import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'


const NavigationItems = () => {
  return (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Order</NavigationItem>
    </ul>
  )
}

export default NavigationItems
