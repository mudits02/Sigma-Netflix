import { BG_URL } from "../Utils/Constants";
import Header from "./Header";
import { useState } from "react";

const Login = () => {

    const [isSignInForm, setSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setSignInForm(!isSignInForm);
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

            <form className="relative z-20 bg-black bg-opacity-75 p-12 rounded-md max-w-md w-full text-white">
                <h1 className="text-4xl mb-8">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                <input 
                    type="text" 
                    placeholder="Email" 
                    className="w-full p-4 my-4 bg-gray-800 rounded text-lg" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full p-4 my-4 bg-gray-800 rounded text-lg" 
                />
                {!isSignInForm && (
                    
                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="w-full p-4 my-4 bg-gray-800 rounded text-lg" 
                        />
                    
                )}
                <button 
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
