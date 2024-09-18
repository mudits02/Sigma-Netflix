import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movie);
    //console.log("Movies data in Seconday Container" , movies);
    return(
        <div className="bg-black">
            <div className="-mt-52 pl-12 relative z-20">
                <MoviesList title={"Now Playing"} movies={movies.nowPlayingMovies} />
                <MoviesList title={"Top Rated"} movies={movies.topRatedMovies} />
                <MoviesList title={"Popular"} movies={movies.popularMovies} />
                <MoviesList title={"Upcoming Movies"} movies={movies.nowPlayingMovies} />
                <MoviesList title={"Horror"} movies={movies.nowPlayingMovies} />
            </div>
        </div>
    )
}

export default SecondaryContainer;