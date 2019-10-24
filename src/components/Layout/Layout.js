import React from 'react'
import './Layout.css'

const Layout = ({children}) => {
  return (
    <React.Fragment>
      <div>
          Toolbar, Sidebar, Backdrop
      </div>
      <main className="content">
          {children}
      </main>
    </React.Fragment>
  )
}

export default Layout
