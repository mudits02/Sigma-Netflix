import { useSelector } from "react-redux";
import { BG_URL } from "../Utils/Constants";
import lang from "../Utils/langConstants";
import { useRef } from "react";
import openai from "../Utils/openAI";

const SearchBar = () => {
    const searchText = useRef(null);
    const langKey = useSelector((store) => store.config.lang); 

    const handleGptSearchClick = async () => {
        // Ensure that the input value is available only when this function is called
        const query = searchText.current?.value || "";

        // Create the GPT query using the search text
        const gptQuery = "Act as a movie recommendation system and suggest some movies for the query: " 
            + query + 
            ". Only give the names of 5 movies, nothing else, comma separated like the example given ahead. Example Result: Gadar, Sholay, Don, Maine Pyaar Kiya, Koi mil gaya";

        console.log(query);

        // API call to GPT API to get movie results
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        console.log(gptResults.choices);
    }

    return (
        <div 
            className="flex items-center justify-center h-screen bg-cover bg-center" 
            style={{ backgroundImage: `url(${BG_URL})` }}
        >
            <form 
                className="w-1/2 bg-black bg-opacity-80 rounded-full shadow-lg p-6 grid grid-cols-12 gap-4"
                onSubmit={(e) => e.preventDefault()} // Prevent form submission
            >
                {/* Search Input */}
                <input 
                    ref={searchText}
                    type="text" 
                    className="col-span-9 py-4 px-6 text-lg bg-gray-800 text-white rounded-l-full focus:outline-none focus:ring-4 focus:ring-red-500 transition-all duration-300" 
                    placeholder={lang[langKey].searchPlaceholder}
                />
                {/* Search Button */}
                <button 
                    onClick={handleGptSearchClick}
                    className="col-span-3 py-4 px-8 text-lg font-bold text-white bg-red-600 rounded-r-full hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 transition-all duration-300"
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
