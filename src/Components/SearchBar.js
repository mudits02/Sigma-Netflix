import { useSelector } from "react-redux";
import { BG_URL } from "../Utils/Constants";
import lang from "../Utils/langConstants";

const SearchBar = () => {

    const langKey = useSelector((store) => store.config.lang); 

    return (
        <div 
            className="flex items-center justify-center h-screen bg-cover bg-center" 
            style={{ backgroundImage: `url(${BG_URL})` }}
        >
            <form className="w-1/2 bg-black bg-opacity-80 rounded-full shadow-lg p-6 grid grid-cols-12 gap-4">
                {/* Search Input */}
                <input 
                    type="text" 
                    className="col-span-9 py-4 px-6 text-lg bg-gray-800 text-white rounded-l-full focus:outline-none focus:ring-4 focus:ring-red-500 transition-all duration-300" 
                    placeholder={lang[langKey].searchPlaceholder}
                />
                {/* Search Button */}
                <button 
                    className="col-span-3 py-4 px-8 text-lg font-bold text-white bg-red-600 rounded-r-full hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 transition-all duration-300"
                    type="submit"
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
