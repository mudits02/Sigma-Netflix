import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies"


const Browse = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    useNowPlayingMovies(); //This imports all the movie data(Cusom Hook)
    usePopularMovies();
    useTopRatedMovies();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navigate = useNavigate();

    const handleSignout = () => {
        signOut(auth).then( () => {
            navigate("/");
        })
        .catch((error) => {
            navigate("/error");
        })
    }

    const closeDropdown = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (dropdownOpen) {
            document.addEventListener("mousedown", closeDropdown);
        } else {
            document.removeEventListener("mousedown", closeDropdown);
        }

        return () => {
            document.removeEventListener("mousedown", closeDropdown);
        };
    }, [dropdownOpen]);

    return (
        <div className="browse relative">
            <Header />
            <MainContainer />
            <SecondaryContainer />
            <div className="absolute top-4 right-8 flex items-center z-10">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="User Icon"
                    className="w-10 h-10 rounded cursor-pointer"
                    onClick={toggleDropdown}
                />
                <div
                    ref={dropdownRef}
                    className={`absolute right-0 mt-2 w-48 bg-black text-white rounded-md shadow-lg py-2 z-20 transition-transform duration-300 ease-in-out ${
                        dropdownOpen ? "transform scale-100 opacity-100" : "transform scale-95 opacity-0 pointer-events-none"
                    }`}
                >
                    <button
                        className="block w-full px-4 py-2 text-left hover:bg-gray-700"
                        onClick={handleSignout}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Browse;