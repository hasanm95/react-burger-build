import React from 'react'
import './Logo.css'
import LogoImg from '../../assets/images/burger-logo.png';

const Logo = props => {
  return (
    <figure className="Logo" style={{height: props.height}}>
        <img src={LogoImg} alt="Logo"/>
    </figure>
  )
}

export default Logo
