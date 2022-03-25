import { useEffect, useState } from 'react';

const api = {
    key: '9d225f682bf19927ae33f065b2ee92bc',
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