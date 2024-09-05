import {useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";


const VideoBackground = ({movieId}) => { //{} helps in destructuring the JS object , if not , it doesnt destructure and throws an error coz it creates an object instead

    useMovieTrailer(movieId);
    const trailerVideo = useSelector(store => store.movie?.videoTrailer);
    return(
        <div>
            <iframe 
                width="560" 
                height="315" 
                src={"https://www.youtube.com/embed/" + trailerVideo?.key} 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                >
            </iframe>
        </div>
    )
}

export default VideoBackground;