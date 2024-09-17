import { useDispatch} from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { useEffect } from "react";
import { addVideoTrailer } from "../Utils/movieSlice";

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();

    const getMovieTrailer =  async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/"+ movieId + "/videos?language=en-US", API_OPTIONS)
        const json = await data.json();

        const filterData = json.results.filter(video => video.type === "Trailer");
        const trailerArray = filterData.length ? filterData.filter(video => video.name === 'Official Trailer') : json.results[0].filter(video => video.name === 'Official Trailer');
        //console.log(trailerArray);
        const trailer = trailerArray[0];       
        //console.log(trailer); 
        dispatch(addVideoTrailer(trailer))
    }

    useEffect(() => {
        getMovieTrailer();
    });
}

export default useMovieTrailer;