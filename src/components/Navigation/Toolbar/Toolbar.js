import React from 'react'
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Drawertoggle from '../SideDrawer/DrawerToggle/Drawertoggle'

const Toolbar = props => {
  return (
    <header className="Toolbar">
        <Drawertoggle clicked={props.drawerToggleClicked}/>
        <Logo height="80%"/>
        <nav className="DesktopOnly">
            <NavigationItems/>
        </nav>
    </header>
  )
}

export default Toolbar
