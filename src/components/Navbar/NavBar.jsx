import { useNavigate } from 'react-router-dom';
import Randomiser from '../Randomiser/Randomiser';

const NavBar =()=> {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/Randomiser')}>
            Randomiser
        </div>

    )
}
export default NavBar;