import { useSelector } from "react-redux";
import MoviesList from "./MoviesList"

const MovieSuggestion = () => {
    const gpt = useSelector((store) => store.gpt); //subscribing to the gpt slice
    const {movieResults , movieName} = gpt;
    if (!movieName) return null;
    return(
        <div className="p-4 m-4 bg-black text-white bg-opacity-50">
            <div>
            {movieName.map((movieName, index) => (
                <MoviesList
                    key={movieName}
                    title={movieName}
                    movies={movieResults[index]}
                />
        ))}
            </div>
        </div>
    )
}

export default MovieSuggestion;