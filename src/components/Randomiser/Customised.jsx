import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import ComponentWrapper from "./RandomiserStyling";
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

    const Randomise = () => {
        localStorage.clear();
        
        fetch(`${api.base}discover/movie?api_key=${api.key}&with_original_language=${languageId}&with_genres=${genreId}`)
        .then(res => res.json())
        .then(data => {
            setMovies(data.results)
            setPage(data.total_pages)
        })
        .catch(err => {
            console.log('Error Reading data: ' + err);
        });
    }

    const TryAgain = () => {
        localStorage.clear();
        let randomPage = Math.floor(Math.random() * 500) + 1;

        console.log(randomPage);
        console.log(page);

        if(randomPage < page) {
            fetch(`${api.base}discover/movie?api_key=${api.key}&page=${randomPage}&with_original_language=${languageId}&with_genres=${genreId}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results)
                console.log('All movies: ', data);
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
                console.log('All movies: ', data);
            })
            .catch(err => {
                console.log('Error Reading data: ' + err);
            });
        }
        
    }

    const clearLS = () => {
        localStorage.clear();
        setMovies([])
        setPage([])
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

    return (
        <ComponentWrapper>
        <div>Randomiser Component: </div>
            <div className="Randomiser-form">
                <div className="wrapper">
                <label>{"Genre (optional):"}</label>
                    {genres && <select id={genreId} onChange={(e) => setGenreId(e.target.value)}>
                        <option value=''>choose a genre...</option>
                        {genres.map((genre)=> {
                            return <option id={genre.id} value={genre.id} key={genre.id}>{genre.name}</option>
                        })}
                    </select>}
                </div>

                <div className="wrapper">
                    <label>{"Language (optional):"}</label>
                    {languages && <select id={languageId} onChange={(e) => setLanguageId(e.target.value)}>
                        <option value=''>choose a language...</option>
                        {languages.map((language)=> {
                            return <option id={language.iso_639_1} value={language.iso_639_1} key={language.iso_639_1}>{language.english_name}</option>
                        })}
                    </select>}
                </div>
                <button onClick={Randomise}>Generate</button>
            </div>
            <button onClick={clearLS}>Clear List</button>
            <button onClick={TryAgain}>Roll again</button>
            {movies && <div>
                    {movies.map((movie)=> {
                        return <div id={movie.id} onClick={() => navigate(`/Movie/${movie.id}`)} key={movie.id}>
                            <img src={movie.poster_path && `https://image.tmdb.org/t/p/w300/${movie.poster_path}`}></img>
                            <div>{movie.original_title}</div>
                        </div>
                    })}
                </div>}
        </ComponentWrapper>
    )
}
export default Customised;