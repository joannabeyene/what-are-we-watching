import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
const api = {
    key: `${process.env.REACT_APP_MOVIE_KEY}`,
    base: 'https://api.themoviedb.org/3/'
}

const Movie = () => {
    const {uuid} = useParams();
    const [movies, setMovies] = useState([]);
    // const [trailer, setTrailer] = useState([]);


    const fetchMovie = () => {
        fetch(`${api.base}movie/${uuid}?api_key=${api.key}&append_to_response=videos`)
        .then(res => res.json())
        .then(data => {
            setMovies(data)
            console.log(data)
        })
        .catch(err => {
            console.log('Error Reading Movie data: ' + err);
        });
    }
    const fetchTrailer = () => {
        const trailer = movies.videos.results.find(vid => vid.name == "Official Trailer")
        return (
            <YouTube
            videoId={trailer.key}/>
        )
    }

    useEffect ( () => {
        // fetchTrailer()
        fetchMovie()
    },[])

    return (<>
                <div id={movies.id} key={movies.id}>
                    <img src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`}></img>
                    <div>{movies.original_title}</div>
                    <div>{movies.overview}</div>
                </div>

                {movies.videos && fetchTrailer()}
                    

    </>)

}
export default Movie;