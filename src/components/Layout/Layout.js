import React, {useState, Fragment} from 'react'
import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {useSelector} from 'react-redux';


const Layout = ({children}) => {
  
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.idToken !== null);
  const sideDrawerCloseHandler = () =>{
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(prevState => !prevState)
  }

  return (
    <Fragment>
      <Toolbar isAuthenticated={isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler}/>
      <SideDrawer isAuthenticated={isAuthenticated} open={showSideDrawer} closed={sideDrawerCloseHandler}/>
      <main className="content">
          {children}
      </main>
    </Fragment>
  )
}

export default Layout
