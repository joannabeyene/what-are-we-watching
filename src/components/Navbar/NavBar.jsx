import { useNavigate } from 'react-router-dom';

const NavBar =()=> {
    const navigate = useNavigate();
    localStorage.clear();
    return (
        <>
        <button onClick={() => navigate('/Customised')}>
            Customised
        </button>
        <button onClick={() => navigate('/Random')}>
            Pick one for me
        </button>
    </>
    )
}
export default NavBar;