import { IMG_CDN_URL } from "../Utils/Constants";

const MoviesCard = ({poster_path}) => {
    if(!poster_path) return null;
    //console.log(movies);

    return(
        <div className="w-48 pr-4">
            <img alt="Poster" src={IMG_CDN_URL + poster_path} />
        </div>
    )
}

export default MoviesCard;