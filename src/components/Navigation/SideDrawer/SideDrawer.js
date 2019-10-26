import React, {Fragment} from 'react'
import './SideDrawer.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'


const SideDrawer = (props) => {
  let attachedClasses = ['SideDrawer', 'Close'];
  if(props.open){
    attachedClasses = ['SideDrawer', 'Open'];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
          <Logo height="11%" style={{marginBottom: '32px'}}/>
          <nav>
              <NavigationItems/>
          </nav>
      </div>
    </Fragment>
  )
}

export default SideDrawer
