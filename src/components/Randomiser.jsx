import {useState, useEffect} from "react"

const api = {
    key: `${process.env.REACT_APP_MOVIE_KEY}`,
    base: 'https://api.themoviedb.org/3/'
}

const Randomiser =()=> {
    const [genres, setGenres] = useState([]);
    const [genreId, setGenreId] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageId, setLanguageId] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [ratingId, setRatingId] = useState([]);
    const [movies, setMovies] = useState([]);
    const [numberOfMovies, setNumberOfMovies] = useState([]);
    

    const onSubmit = (e) => {
        e.preventDefault();

        fetch(`${api.base}discover/movie?api_key=${api.key}&with_original_language=${languageId}&with_genres=${genreId}&vote_average.gte=${ratingId}`)
        .then(res => res.json())
        .then(data => {
            let random = data.results.sort(() => Math.random() - 0.5)
            setMovies(random)
        })
        .catch(err => {
            console.log('Error Reading Genre data: ' + err);
        });
    }

    const fetchRatings = ()=>{
        fetch('http://localhost:3001/ratings')
        .then(res => res.json())
        .then(data => setRatings(data))
        .catch(err => {
            console.log('Error Reading Genre data: ' + err);
        });
    }
    const fetchGenres = () => {
        fetch(`${api.base}genre/movie/list?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => setGenres(data))
        .catch(err => {
            console.log('Error Reading Genre data: ' + err);
        });
    }
    const fetchLanguages = () => {
        fetch(`${api.base}configuration/languages?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => setLanguages(data))
        .catch(err => {
            console.log('Error Reading Language data: ' + err);
        });
    }

    useEffect (() => {
        fetchGenres()
        fetchLanguages()
        fetchRatings()
    },[])

    return (
        <>
        <div>Randomiser Component: </div>
            <form onSubmit={onSubmit}>

                {/* Select field: Genre */}
                {(typeof genres.genres != 'undefined')?
                (<select required id={genreId} onChange={(e) => setGenreId(e.target.value)}>
                    <option value=''>choose a genre...</option>
                    <option value=''>All</option>
                    {genres.genres.map((genre)=> {
                        return <option id={genre.id} value={genre.id} key={genre.id}>{genre.name}</option>
                    })}
                </select>):('')}

                {/* Select field: Year */}
                <select>
                    <option value=''>choose a year...</option>
                    <option value=''>All</option>
                </select>

                {/* Select field: Languages */}
                {(typeof languages != 'undefined')?
                (<select required id={languageId} onChange={(e) => setLanguageId(e.target.value)}>
                    <option value=''>choose a language...</option>
                    <option value=''>All</option>
                    {languages.map((language)=> {
                        return <option id={language.iso_639_1} value={language.iso_639_1} key={language.iso_639_1}>{language.english_name}</option>
                    })}
                </select>):('')}

                {/* Select field: Rating */}
                <select required id={ratingId} onChange={(e) => setRatingId(e.target.value)}>
                    <option value=''>choose min rating...</option>
                    <option value=''>All</option>
                    {ratings.map((rating)=> {
                        return <option id={rating} value={rating} key={rating}>{rating}</option>
                    })}
                </select>

                {/* Input field: Number of Movies */}
                {/* <div>
                    <span>number of movies(max 20): </span>
                    <input onChange={(e) => setNumberOfMovies(e.target.value)} type='number' name='number' min='1' max='20' step='1'></input>
                </div> */}
                <button>Generate</button>
            </form>

            <div>
            {(typeof movies != 'undefined')?
                (<div>
                    {movies.map((movie)=> {
                        return <div>
                            <img src={movie.backdrop_path}></img>
                            <div>{movie.original_title}</div>
                        </div>
                    })}
                </div>):('')}
            </div>
        </>
    )
}
export default Randomiser;