import { LOGO_URL } from "../Utils/Constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../Utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <div className="absolute top-0 left-0 w-full px-8 py-4 bg-gradient-to-b from-black to-transparent z-10">
            <img 
                className="w-36"
                src={LOGO_URL}
                alt="logo"
            />
        </div>
    )
}

export default Header;
 