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
        localStorage.clear();
        let randomPage = Math.floor(Math.random() * 500) + 1;
        let randomMovie = Math.floor(Math.random() * 19);
        fetch(`${api.base}discover/movie?api_key=${api.key}&page=${randomPage}`)
        .then(res => res.json())
        .then(data => {
            setMovies(data.results[randomMovie])
            console.log(data.results[randomMovie])
        })
        .catch(err => {
            console.log('Error Reading Movie data: ' + err);
        });
    }

    useEffect ( () => {
        const movieData = localStorage.getItem("randomised");
        if(movieData) {
          setMovies(JSON.parse(movieData))
        }
    },[])

    useEffect (() => {
        localStorage.setItem("randomised", JSON.stringify(movies));
    },[movies])

    return (<>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={fetchMovie}>Roll</button>
        <div id={movies.id} onClick={() => navigate(`/Movie/${movies.id}`)} key={movies.id}>
            <img src={movies.poster_path && `https://image.tmdb.org/t/p/w300/${movies.poster_path}`}></img>
            <div>{movies.original_title}</div>
        </div>
    </>)

}
export default Random;