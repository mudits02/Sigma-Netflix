import "./searchBar.css";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, BG_URL } from "../Utils/Constants";
import lang from "../Utils/langConstants";
import { useRef } from "react";
import openai from "../Utils/openAI";
import { addGptMovieResult } from "../Utils/searchSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = () => {
    const searchText = useRef(null);
    const langKey = useSelector((store) => store.config.lang); 
    const dispatch = useDispatch();

    // search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();

        return json.results;
    };

    const handleGptSearchClick = async () => {
        try {
            const query = searchText.current?.value || "";
    
            if (!query.trim()) {
                toast.error("Please enter a search query!", {
                    position: "top-right",
                    autoClose: 3000,
                });
                return;
            }
    
            const gptQuery = 
                "Act as a movie recommendation system and suggest some movies for the query: " 
                + query + 
                ". Only give the names of 5 movies, nothing else, comma separated like the example given ahead. Example Result: Gadar, Sholay, Don, Maine Pyaar Kiya, Koi mil gaya";
    
            // API call to GPT API
            const gptResults = await openai.chat.completions.create({
                messages: [{ role: 'user', content: gptQuery }],
                model: 'gpt-3.5-turbo',
            });
    
            const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");
            console.log(gptMovies);
    
            if (!gptMovies || gptMovies.length === 0) {
                throw new Error("No movie recommendations found from GPT.");
            }
    
            // Search for each Movie in the TMDB API
            const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
            const tmdbResults = await Promise.all(promiseArray);
    
            console.log(tmdbResults);
            dispatch(addGptMovieResult({ movieName: gptMovies, movieResults: tmdbResults }));
    
            toast.success("Movies fetched successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch movie recommendations. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };    

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-cover bg-center" 
            style={{ 
                backgroundImage: `url(${BG_URL})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <ToastContainer />
            <form 
                className="w-1/2 bg-black bg-opacity-80 rounded-full shadow-lg p-6 grid grid-cols-12 gap-4"
                onSubmit={(e) => e.preventDefault()}
            >
                <input 
                    ref={searchText}
                    type="text" 
                    className="col-span-9 py-4 px-6 text-lg bg-gray-800 text-white rounded-l-full focus:outline-none focus:ring-4 focus:ring-red-500 transition-all duration-300" 
                    placeholder={lang[langKey].searchPlaceholder}
                />
                <button 
                    onClick={handleGptSearchClick}
                    className="col-span-3 py-4 px-8 text-lg font-bold text-white bg-red-600 rounded-r-full hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 transition-all duration-300"
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );    
};

export default SearchBar;
