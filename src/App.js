import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Customised from './components/Randomiser/Customised';
import Movie from './components/Movie/Movie';
import NavBar from './components/NavBar/NavBar';
import Random from './components/Randomiser/Random';
import Footer from './components/Footer/Footer';

const App =()=> {
    return (<>
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" exact element={<Customised />} />
                <Route path="/Random" exact element={<Random />} />
                <Route path="/Movie/:uuid" element={<Movie />} />
            </Routes>
            <Footer/>
        </Router>
    </>)
}
export default App;
