import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import ComponentWrapper from "./RandomiserStyling";
const api = {
    key: `${process.env.REACT_APP_MOVIE_KEY}`,
    base: 'https://api.themoviedb.org/3/'
}

const Randomiser =()=> {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [genreId, setGenreId] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageId, setLanguageId] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [ratingId, setRatingId] = useState([]);
    const [movies, setMovies] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();

        fetch(`${api.base}discover/movie?api_key=${api.key}&with_original_language=${languageId}&with_genres=${genreId}&vote_average.gte=${ratingId}`)
        .then(res => res.json())
        .then(data => {
            let random = data.results.sort(() => Math.random() - 0.5)
            setMovies(random)
        })
        .catch(err => {
            console.log('Error Reading data: ' + err);
        });
    }
    const fetchRatings = () => {
        fetch('http://localhost:3001/ratings')
        .then(res => res.json())
        .then(data => setRatings(data))
        .catch(err => {
            console.log('Error Reading data: ' + err);
        });
    }
    const fetchGenres = () => {
        fetch(`${api.base}genre/movie/list?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => setGenres(data))
        .catch(err => {
            console.log('Error Reading data: ' + err);
        });
    }
    const fetchLanguages = () => {
        fetch(`${api.base}configuration/languages?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => setLanguages(data))
        .catch(err => {
            console.log('Error Reading data: ' + err);
        });
    }

    useEffect (() => {
        fetchGenres()
        fetchLanguages()
        fetchRatings()
    },[])

    return (
        <ComponentWrapper>
        <div>Randomiser Component: </div>
            <form className="Randomiser-form" onSubmit={onSubmit}>
                <div className="wrapper">
                <label>Genre: </label>
                    {(typeof genres.genres != 'undefined')?
                    (<select required id={genreId} onChange={(e) => setGenreId(e.target.value)}>
                        <option value=''>choose a genre...</option>
                        <option value=''>All</option>
                        {genres.genres.map((genre)=> {
                            return <option id={genre.id} value={genre.id} key={genre.id}>{genre.name}</option>
                        })}
                    </select>):('')}
                </div>

                <div className="wrapper">
                    <label>Language: </label>
                    {(typeof languages != 'undefined')?
                    (<select required id={languageId} onChange={(e) => setLanguageId(e.target.value)}>
                        <option value=''>choose a language...</option>
                        <option value=''>All</option>
                        {languages.map((language)=> {
                            return <option id={language.iso_639_1} value={language.iso_639_1} key={language.iso_639_1}>{language.english_name}</option>
                        })}
                    </select>):('')}
                </div>

                <div className="wrapper">
                    <label>Rating: </label>
                    <select required id={ratingId} onChange={(e) => setRatingId(e.target.value)}>
                        <option value=''>choose min rating...</option>
                        <option value=''>All</option>
                        {ratings.map((rating)=> {
                            return <option id={rating} value={rating} key={rating}>{rating}</option>
                        })}
                    </select>
                </div>
                <button>Generate</button>
            </form>

            <div>
            {(typeof movies != 'undefined')?
                (<div>
                    {movies.map((movie)=> {
                        return <div id={movie.id} onClick={() => navigate(`/Movie/${movie.id}`)} key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}></img>
                            <div>{movie.original_title}</div>
                        </div>
                    })}
                </div>):('')}
            </div>
        </ComponentWrapper>
    )
}
export default Randomiser;