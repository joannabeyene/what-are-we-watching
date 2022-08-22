import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import Style from './MovieStyling';

const api = {
    key: `${process.env.REACT_APP_MOVIE_KEY}`,
    base: 'https://api.themoviedb.org/3/'
}

const Movie = () => {
    const {uuid} = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [credits, setCredits] = useState([]);

    const fetchMovie = () => {
        fetch(`${api.base}movie/${uuid}?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => {
            setMovie(data)
            console.log(data)
        })
        .catch(err => {
            console.log('Error Reading Movie data: ' + err);
        });
    }
    const fetchTrailer = () => {
        fetch(`${api.base}movie/${uuid}?api_key=${api.key}&append_to_response=videos`)
        .then(res => res.json())
        .then(data => {
            setTrailer(data.videos.results.find(vid => vid.name == "Official Trailer"))
            console.log(data)
        })
        .catch(err => {
            console.log('Error Reading Movie data: ' + err);
        });
    }
    const fetchCredits = () => {
        fetch(`${api.base}movie/${uuid}/credits?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => {
            let stars = data.cast.slice(0, 5)
            setCredits(stars)
            console.log(data)
        })
        .catch(err => {
            console.log('Error Reading Movie data: ' + err);
        });
    }

    useEffect ( () => {
        fetchCredits()
        fetchTrailer()
        fetchMovie()
    },[])
    return (<>
        <Style>
            <button onClick={() => navigate(-1)}>Back</button>
            <div id={movie.id} key={movie.id}>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`:'https://via.placeholder.com/250/CCCCCC/000000?text=No+Image'}></img>
                <div className='content'>
                    <h2 className='movie-title'>{movie.title}</h2>
                    <p>{movie.release_date?.substring(0, 4)}</p>
                    <p className='rating'> &#9733;{movie.vote_average}</p>
                    <p className='overview'>{movie.overview}</p>
                    {credits && <ul className='cast'>Starring: {credits.map((casts => {
                        return <li key={casts.id}>{casts.name}</li>
                    }))}</ul>}
                    {movie.genres && <ul className='genres'>Genres: {movie.genres.map((genre)=> {
                        return <li key={genre.id}>{genre.name}</li>})}</ul>}
                </div>
            </div>

            {trailer &&  <YouTube
            videoId={trailer.key}/>}
                        
        </Style>
    </>)

}
export default Movie;