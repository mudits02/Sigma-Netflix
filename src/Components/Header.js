import { LOGO_URL } from "../Utils/Constants";

const Header = () => {
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
