import NavBar from "./Navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Randomiser from "./Randomiser/Randomiser";
import Movie from "./Movies/Movie";
const Main =()=> {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<NavBar/>} />
                <Route path="/Randomiser" exact element={<Randomiser />} />
                <Route path="/Movie/:uuid" element={<Movie />} />
            </Routes>
        </Router>

    )
}
export default Main;