import React from 'react'
import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


const Layout = ({children}) => {
  return (
    <React.Fragment>
      <Toolbar/>
      <SideDrawer/>
      <main className="content">
          {children}
      </main>
    </React.Fragment>
  )
}

export default Layout
