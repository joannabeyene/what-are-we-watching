import { useEffect, useState } from 'react';

const api = {
    key: `${process.env.REACT_APP_MOVIE_KEY}`,
    base: 'https://api.themoviedb.org/3/movie/popular?'
}
const Movies = () => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = () => {
        fetch(`${api.base}api_key=${api.key}`)
        .then(res => res.json())
        .then(data => setMovies(data))
        .catch(err => {
            console.log('Error Reading data: ' + err);
        });
    }

    return (<>
        <button onClick={fetchMovies}>Click me!</button>
        {(typeof movies.results != 'undefined')?
            (<ul>
                {movies.results.map((movie)=> {
                    return <li key={movie.id}>{movie.title}</li>
                })}
            </ul>) : ('')
        }
    </>)
}
export default Movies;