import { API_OPTIONS , API_KEY} from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { addHorrorMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const useHorrorMovies = () => {
    const dispatch = useDispatch();

    const getHorrorMovies = async () => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US&page=1`
        const data = await fetch(url, API_OPTIONS);
        const json = await data.json();
        console.log("Root of the dispatch of Horror movies" , json);
        dispatch(addHorrorMovies(json.results));
    }

    useEffect(() => {
        getHorrorMovies();
    }, [])

}

export default useHorrorMovies;
    