import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    const [director, setDirector] = useState([]);
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
            console.log(data.videos.results.find(vid => vid.name == "Official Trailer"))
        })
        .catch(err => {
            console.log('Error Reading Movie data: ' + err);
        });
    }
    const fetchCredits = () => {
        fetch(`${api.base}movie/${uuid}/credits?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => {
            let stars = data.cast.slice(0, 8)
            setCredits(stars)
            setDirector(data.crew.find(directing => directing.department == "Directing"))
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

    console.log(director);
    return (<>
        <Style>
            <div className='banner' style={{backgroundImage: movie.backdrop_path ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`:'url(/images/placeholder.png)'}}></div>
            <div className="movie-content" id={movie.id} key={movie.id}>
                <div className='info'>
                    <h2 className='title'>{movie.title} {`(${movie.release_date?.substring(0, 4)})`}</h2>
                    {movie.genres && <div className='genres'>{movie.genres.slice(0, 5).map((genre)=> (
                        <span className='genre' key={genre.id}>{genre.name}</span>))}
                    </div>}
                    <p className='rating'> &#9733;{Math.round(movie.vote_average * 10) / 10}</p>
                    <p className='overview'>{movie.overview}</p>
                    
                    {director &&<div className='crew'>
                        <h2>Director</h2>
                        <p>{director.name}</p>
                    </div>}

                    <div className='cast'>
                        <h2>Starring</h2>
                        {credits && <div className='casts'>{credits.map((casts => (
                            <div key={casts.id}>
                                <div className='image' style={{backgroundImage: casts.profile_path ? `url(https://image.tmdb.org/t/p/original/${casts.profile_path})`:'url(/images/placeholder.png)'}} ></div>
                                <div className='name'>{casts.name}</div>  
                            </div>
                        )))}</div>}
                    </div>
                </div>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>

            {trailer && <div className='trailer-wrapper'>
                <h2>{trailer.name}</h2>
                <div className='trailer'>
                    <iframe src={`https://www.youtube.com/embed/${trailer.key}`}/>
                </div>
            </div> }
            
                        
        </Style>
    </>)

}
export default Movie;