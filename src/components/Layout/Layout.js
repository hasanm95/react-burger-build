import React, {useState, Fragment} from 'react'
import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


const Layout = ({children}) => {
  
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCloseHandler = () =>{
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(prevState => !prevState)
  }

  return (
    <Fragment>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
      <SideDrawer open={showSideDrawer} closed={sideDrawerCloseHandler}/>
      <main className="content">
          {children}
      </main>
    </Fragment>
  )
}

export default Layout
