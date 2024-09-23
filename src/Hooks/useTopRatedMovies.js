import { API_OPTIONS } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector((store) => store.movie.topRatedMovies);

    const getTopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        console.log("Root of the dispatch of Top Rated movies" , json);
        dispatch(addTopRatedMovies(json.results));
    }

    useEffect(() => {
       !topRatedMovies && getTopRatedMovies();
    }, [])

}

export default useTopRatedMovies;
    