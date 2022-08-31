import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import Style from "./RandomStyling";

const api = {
    key: `${process.env.REACT_APP_MOVIE_KEY}`,
    base: 'https://api.themoviedb.org/3/'
}

const Random = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState();

    const fetchMovie = () => {
        localStorage.clear();
        let randomPage = Math.floor(Math.random() * 500) + 1;
        let randomMovie = Math.floor(Math.random() * 19);
        fetch(`${api.base}discover/movie?api_key=${api.key}&page=${randomPage}`)
        .then(res => res.json())
        .then(data => {
            setMovie(data.results[randomMovie])
            console.log(data.results[randomMovie]);
        })
        .catch(err => {
            console.log('Error Reading Movie data: ' + err);
        });
    }

    useEffect ( () => {
        const movieData = localStorage.getItem("randomised");
        if(movieData) {
          setMovie(JSON.parse(movieData))
        }
    },[])

    useEffect (() => {
        localStorage.setItem("randomised", JSON.stringify(movie));
    },[movie])

    return (<>
    <Style>
        <div className="wrapper">
            <h2>Random Movie Generator</h2>
            <p><span style={{textDecoration: 'underline'}}>Click the Button</span> and Get a Movie Picked For You!</p>
            <button onClick={fetchMovie}>Roll</button>
        </div>
        
        {movie && <div className="card" id={movie.id} onClick={() => navigate(`/Movie/${movie.id}`)} key={movie.id}>
            <h2 className="title">{movie.title} {`(${movie.release_date?.substring(0, 4)})`}</h2>
            <img className="image" src={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`:'/images/placeholder.png'} alt='movie poster'></img>
        </div>}
    </Style>
    </>)
}
export default Random;