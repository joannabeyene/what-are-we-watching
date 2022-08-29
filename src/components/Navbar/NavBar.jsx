import {useState} from 'react'
import { NavLink } from 'react-router-dom';
import Style from './NavBarStyling';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useMediaQuery } from 'react-responsive'
import { CgCloseO } from 'react-icons/cg'

const NavBar = () => {
    localStorage.clear();

    const isMobile = useMediaQuery({ query: '(max-width: 480px)' })
    const [open, setOpen] = useState(false)
    const CloseMenu = <CgCloseO size={35} onClick= {() => setOpen(!open)}/>
    const OpenMenu = <GiHamburgerMenu size={35} color= '#FFFFF' onClick= {() => setOpen(!open)}/>
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    return (<>
        <Style>
            {!isMobile &&<nav>
                <ul>
                    <li><NavLink onClick={handleClick} to='/' className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
                    <li><NavLink onClick={handleClick} to='/Random' className={({ isActive }) => (isActive ? "active" : "")}>Random</NavLink></li>
                </ul>
            </nav>}
            {isMobile && <nav>
               {open ? CloseMenu : OpenMenu}
               {open && <ul>
                    <li><NavLink onClick={handleClick} to='/' className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
                    <li><NavLink onClick={handleClick} to='/Random' className={({ isActive }) => (isActive ? "active" : "")}>Random</NavLink></li>
                </ul>}
            </nav>
            }
        </Style>
    </> )
}

export default NavBar