import { BG_URL } from "../Utils/Constants";
import { checkValidData } from "../Utils/Validate";
import Header from "./Header";
import { useState, useRef } from "react";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , updateProfile } from "firebase/auth";
import { addUser } from "../Utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {

    const [isSignInForm, setSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); //basically navigates to the endpoint passed as argument

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setSignInForm(!isSignInForm);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        if (isSignInForm) {
            // Sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        } else {
            // Sign Up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    updateProfile(auth.currentUser, {
                        displayName: name.current.value,
                      }).then(() => {
                        const {uid , email , displayName} = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                            })
                        )
                        navigate("/browse")
                      }).catch((error) => {
                            setErrorMessage(error.message);
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(`${errorCode} - ${errorMessage}`);
                });
        }
    }

    return (
        <div className="relative h-screen w-screen flex items-center justify-center bg-black">
            <Header />
            <div className="absolute top-0 left-0 w-full h-full">
                <img
                    src={BG_URL}
                    alt="Background"
                    className="w-full h-full object-cover opacity-80"
                />
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="relative z-20 bg-black bg-opacity-75 p-12 rounded-md max-w-md w-full text-white">
                <h1 className="text-4xl mb-8">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                <input
                    ref={email}
                    type="text"
                    placeholder="Email"
                    className="w-full p-4 my-4 bg-gray-800 rounded text-lg"
                />
                <div className="relative w-full">
                    <input
                        ref={password}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-4 my-4 bg-gray-800 rounded text-lg"
                    />
                    <span
                        className="absolute right-4 top-4 text-gray-500 cursor-pointer"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                <p className="text-red-500">{errorMessage}</p>
                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Name"
                        className="w-full p-4 my-4 bg-gray-800 rounded text-lg"
                    />
                )}
                <button
                    onClick={handleButtonClick}
                    className="w-full p-4 mt-4 bg-red-600 rounded text-lg hover:bg-red-700 transition-colors duration-300">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="py-10 font-bold cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already a Member? Sign In Now"}
                </p>
            </form>
        </div>
    )
}

export default Login;
