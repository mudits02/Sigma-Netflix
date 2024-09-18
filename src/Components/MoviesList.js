import MoviesCard from "./MoviesCard";

const MoviesList = ({ title, movies }) => {
    //console.log("Movies list inside MoviesList ", movies);

    // Check if movies is not null or undefined and has at least one movie
    if (!movies || movies.length === 0) {
        return <div>No movies available</div>; // Handle case when movies are not loaded yet
    }

    return (
        <div className="p-6 ">
            <h1 className="text-3xl py-4 text-white">{title}</h1>
            <div className="flex overflow-x-scroll">
                <div className="flex">
                    {movies.map((movie) => <MoviesCard key={movie.id} poster_path={movie.poster_path} />)}
                </div>
            </div>
        </div>
    );
};

export default MoviesList;
