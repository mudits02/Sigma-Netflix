import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Utils/userSlice";
import { LOGO_URL , SUPPORTED_LANGUAGES } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchView } from "../Utils/searchSlice";
import { changeLanguage } from "../Utils/configSlice";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showSearch = useSelector((store) => store.gpt.showSearch);
    const location = useLocation();

    const isLoginPage = location.pathname === "/";
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
    }, [dispatch, navigate]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch(() => {
                navigate("/error");
            });
    };

    const closeDropdown = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    const handleSearchButton = () => {
        dispatch(toggleSearchView());
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

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between absolute top-0 left-0 w-full px-4 md:px-8 py-4 bg-gradient-to-b from-black to-transparent z-10">
            {/* Netflix Logo */}
            <img className="w-24 md:w-36" src={LOGO_URL} alt="Netflix Logo" />

            <div className="flex items-center w-full mt-4 md:mt-0 md:w-auto">
                {/* Movie Search Button */}
                {!isLoginPage && 

                <button
                    className="ml-auto md:ml-0 py-2 px-3 md:px-4 m-2 bg-purple-800 text-white rounded-lg md:rounded-full text-sm md:text-base"
                    onClick={handleSearchButton}
                >
                    {showSearch ? "Home Page" : "Search Movie"}
                </button>
                }

                {/* Language Select Dropdown */}
                {showSearch && (
                    <select
                        onChange={handleLanguageChange}
                        className="ml-2 md:ml-4 bg-gray-900 text-white py-2 px-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
                    >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                            <option key={lang.identifier} value={lang.identifier}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                )}

                {/* Avatar and Dropdown */}
                <div className="relative flex items-center ml-4">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="User Avatar"
                        className="w-8 md:w-10 h-8 md:h-10 rounded cursor-pointer"
                        onClick={toggleDropdown}
                    />
                    <div
                        ref={dropdownRef}
                        className={`absolute right-0 mt-2 w-32 md:w-48 bg-black text-white rounded-md shadow-lg py-2 z-20 transition-transform duration-300 ease-in-out ${
                            dropdownOpen
                                ? "transform scale-100 opacity-100"
                                : "transform scale-95 opacity-0 pointer-events-none"
                        }`}
                    >
                        <button
                            className="block w-full px-4 py-2 text-left hover:bg-gray-700 text-sm md:text-base"
                            onClick={handleSignout}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
