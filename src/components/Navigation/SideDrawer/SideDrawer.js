import React from 'react'
import './SideDrawer.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'


const SideDrawer = () => {
  return (
    <div className="SideDrawer">
        <Logo height="11%" style={{marginBottom: '32px'}}/>
        <nav>
            <NavigationItems/>
        </nav>
    </div>
  )
}

export default SideDrawer
