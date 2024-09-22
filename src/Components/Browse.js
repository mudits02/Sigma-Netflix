import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import Header from "./Header";
import Search from "./Search";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";
import useHorrorMovies from "../Hooks/useHorrorMovies";
import { useSelector } from "react-redux";

const Browse = () => {
    useNowPlayingMovies();  // Custom Hook for fetching data
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    useHorrorMovies();

    const showSearch = useSelector(store => store.gpt.showSearch);
    return (
        <div className="browse relative">
            <Header />
            {showSearch ? (<Search />)
            : (
            <>
                <MainContainer />
                <SecondaryContainer />
            </>  
            )  
        }
        </div>
    );
};

export default Browse;
