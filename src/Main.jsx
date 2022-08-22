import { useNavigate } from 'react-router-dom';

const Main =()=> {
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
export default Main;