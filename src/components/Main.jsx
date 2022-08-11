import NavBar from "./Navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customised from "./Randomiser/Customised";
import Random from "./Randomiser/Random";
import Movie from "./Movies/Movie";
const Main =()=> {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<NavBar/>} />
                <Route path="/Customised" exact element={<Customised />} />
                <Route path="/Random" exact element={<Random />} />
                <Route path="/Movie/:uuid" element={<Movie />} />
            </Routes>
        </Router>

    )
}
export default Main;