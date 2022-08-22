import Main from './Main';
import Customised from './components/Randomiser/Customised';
import Random from './components/Randomiser/Random';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movie from './components/Movie/Movie';
const App =()=> {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Main/>} />
                <Route path="/Customised" exact element={<Customised />} />
                <Route path="/Random" exact element={<Random />} />
                <Route path="/Movie/:uuid" element={<Movie />} />
            </Routes>
        </Router>

    )
}
export default App;
