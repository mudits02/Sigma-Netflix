import { LOGO_URL } from "../Utils/Constants";
import Header from "./Header"

const Login = () => {
    return(
        <div className="login">
            <Header />
            <img
                src = {LOGO_URL}
                alt = "Logo"
            />
        </div>
    )
}

export default Login;