import React from 'react'
import {ReactComponent as Logo} from '../../TMDb-logo.svg'
import Style from './FooterStyling'

const Footer = () => {
  return (<>
    <Style>
      <Logo width={100}/>
      <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
    </Style>
    </>)
}

export default Footer