import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const api = {
    key: `${process.env.REACT_APP_MOVIE_KEY}`,
    base: 'https://api.themoviedb.org/3/'
}

const Movie = () => {
    const {uuid} = useParams();
    const [movies, setMovies] = useState([]);


    const fetchMovie = () => {
        fetch(`${api.base}movie/${uuid}?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => {
            setMovies(data)
            console.log(data)
        })
        .catch(err => {
            console.log('Error Reading Movie data: ' + err);
        });
    }

    useEffect ( () => {
        fetchMovie()
    },[])

    return (<>
                <div>
                        <div id={movies.id} key={movies.id}>
                            <img src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`}></img>
                            <div>{movies.original_title}</div>
                            <div>{movies.overview}</div>
                        </div>
                    
                </div>

    </>)

}
export default Movie;