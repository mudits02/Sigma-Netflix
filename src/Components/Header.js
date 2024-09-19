import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { useNavigate} from "react-router-dom";
import { auth } from "../Utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Utils/userSlice";
import { LOGO_URL } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { toggleSearchView } from "../Utils/searchSlice";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
            if(user){
                const {uid , email, displayName} = user;
                dispatch(addUser({uid: uid , email: email , displayName: displayName}));
                navigate("/browse");
            }

            
            else{
                dispatch(removeUser());
                navigate("/");
            }
        })
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
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
    }

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
        <div className="flex items-center justify-between absolute top-0 left-0 w-full px-8 py-4 bg-gradient-to-b from-black to-transparent z-10">
            {/* Netflix Logo */}
            <img className="w-36" src={LOGO_URL} alt="Netflix Logo" />

            {/* Movie Search Button */}
            <button className="ml-auto py-2 px-4 m-2 bg-purple-800 text-white"
            onClick={handleSearchButton()}
            >
                Movie Search
            </button>

            {/* Avatar and Dropdown */}
            <div className="relative flex items-center ml-4">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="User Avatar"
                    className="w-10 h-10 rounded cursor-pointer"
                    onClick={toggleDropdown}
                />
                <div
                    ref={dropdownRef}
                    className={`absolute right-0 mt-2 w-48 bg-black text-white rounded-md shadow-lg py-2 z-20 transition-transform duration-300 ease-in-out ${
                        dropdownOpen
                            ? "transform scale-100 opacity-100"
                            : "transform scale-95 opacity-0 pointer-events-none"
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

export default Header;
