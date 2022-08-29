import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import Style from "./CustomisedStyling";
import {BiCameraMovie} from 'react-icons/bi'
const api = {
    key: `${process.env.REACT_APP_MOVIE_KEY}`,
    base: 'https://api.themoviedb.org/3/'
}
const Customised =()=> {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [genreId, setGenreId] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageId, setLanguageId] = useState([]);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' })

    const Randomise = () => {
        localStorage.clear();
        fetch(`${api.base}discover/movie?api_key=${api.key}&with_original_language=${languageId}&with_genres=${genreId}`)
        .then(res => res.json())
        .then(data => {
            setMovies(data.results)
            setPage(data.total_pages)
            console.log(data.results);
        })
        .catch(err => {
            console.log('Error Reading data: ' + err);
        });
    }

    const TryAgain = () => {
        localStorage.clear();
        let randomPage = Math.floor(Math.random() * 500) + 1;
        if(randomPage < page) {
            fetch(`${api.base}discover/movie?api_key=${api.key}&page=${randomPage}&with_original_language=${languageId}&with_genres=${genreId}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results)
            })
            .catch(err => {
                console.log('Error Reading data: ' + err);
            });
        }
        else {
            fetch(`${api.base}discover/movie?api_key=${api.key}&page=${page}&with_original_language=${languageId}&with_genres=${genreId}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results)
            })
            .catch(err => {
                console.log('Error Reading data: ' + err);
            });
        }
        
    }

    const fetchGenres = () => {
        fetch(`${api.base}genre/movie/list?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => setGenres(data.genres))
        .catch(err => {
            console.log('Error Reading data: ' + err);
        });
    }
    const fetchLanguages = () => {
        fetch(`${api.base}configuration/languages?api_key=${api.key}`)
        .then(res => res.json())
        .then(data => setLanguages(data)
        )
        .catch(err => {
            console.log('Error Reading data: ' + err);
        });
    }

    useEffect (() => {
        fetchGenres()
        fetchLanguages()
        const movieData = localStorage.getItem("randomised");
        if(movieData) {
          setMovies(JSON.parse(movieData))
        }
        const totalPages = localStorage.getItem("totalPages");
        if(totalPages) {
          setPage(JSON.parse(totalPages))
        }
    },[])

    useEffect (() => {
        localStorage.setItem("randomised", JSON.stringify(movies));
        localStorage.setItem("totalPages", JSON.stringify(page));
    },[movies, page])

    return (<>
        <Style>
            <div className="welcome">
                <BiCameraMovie size={65} />
                <h1 style={{color: '#F0803C'}}>What Are We Watching</h1>
                <h2>Get Movies chosen for you, <span className="underline">customised</span> or <span className="underline">random</span>!</h2>
            </div>
            <div className="form">
                <h2>Customise and Add some Filters of Your Choice!</h2>
                <div className="content">
                    <div className="genre">
                    <label>{"Genre (optional):"}</label>
                        {genres && <select id={genreId} onChange={(e) => setGenreId(e.target.value)}>
                            <option value=''>choose a genre...</option>
                            {genres.map((genre)=> {
                                return <option id={genre.id} value={genre.id} key={genre.id}>{genre.name}</option>
                            })}
                        </select>}
                    </div>

                    <div className="language">
                        <label>{"Language (optional):"}</label>
                        {languages && <select id={languageId} onChange={(e) => setLanguageId(e.target.value)}>
                            <option value=''>choose a language...</option>
                            {languages.map((language)=> {
                                return <option id={language.iso_639_1} value={language.iso_639_1} key={language.iso_639_1}>{language.english_name}</option>
                            })}
                        </select>}
                    </div>
                </div>                           
                <button onClick={Randomise}>Generate</button>
            </div>
            {!isMobile &&<div className="movies-wrapper">
                {page > 1 && <button onClick={TryAgain}>Roll again</button>}
                {movies && <div className="movies">
                    {movies.map((movie)=> (
                        <div className="card" id={movie.id} onClick={() => navigate(`/Movie/${movie.id}`)} key={movie.id}>
                            <div className="image"><div className="wrapper"><img src={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`:'/images/placeholder.png'}></img></div></div>
                            <div className="content">
                                <h2>{movie.title} {`(${movie.release_date?.substring(0, 4)})`}</h2>
                                <p>&#9733;{Math.round(movie.vote_average * 10) / 10}</p>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>}
            {isMobile &&<div className="movies-wrapper">
                {page > 1 && <button onClick={TryAgain}>Roll again</button>}
                {movies && <div className="carousel-wrapper">
                    <div className="carousel">
                    {movies.map((movie)=> (
                        <div className="carousel-item card" id={movie.id} onClick={() => navigate(`/Movie/${movie.id}`)} key={movie.id}>
                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`:'url/images/placeholder.png'}></img>
                            <div className="content">
                                <h2>{movie.title} {`(${movie.release_date?.substring(0, 4)})`}</h2>
                                <p>&#9733;{Math.round(movie.vote_average * 10) / 10}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>}
            </div>
            }
        </Style>
    </>)
}
export default Customised;