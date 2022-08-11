import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';

const api = {
    key: `${process.env.REACT_APP_MOVIE_KEY}`,
    base: 'https://api.themoviedb.org/3/'
}

const Random = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    const fetchMovie = () => {
        let randomPage = Math.floor(Math.random() * 500) + 1;
        let randomMovie = Math.floor(Math.random() * 20);
        fetch(`${api.base}discover/movie?api_key=${api.key}&page=${randomPage}`)
        .then(res => res.json())
        .then(data => {
            setMovies(data.results[randomMovie])
            console.log(data)
        })
        .catch(err => {
            console.log('Error Reading Movie data: ' + err);
        });
    }

    return (<>
    <button onClick={fetchMovie}>Roll again</button>
        <div id={movies.id} onClick={() => navigate(`/Movie/${movies.id}`)} key={movies.id}>
                <img src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`}></img>
                <div>{movies.original_title}</div>
        </div>

    </>)

}
export default Random;