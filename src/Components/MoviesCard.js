import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../Utils/Constants";

const MoviesCard = ({poster_path}) => {

    //console.log(movies);

    return(
        <div className="w-48 pr-4">
            <img alt="Poster" src={IMG_CDN_URL + poster_path} />
        </div>
    )
}

export default MoviesCard;