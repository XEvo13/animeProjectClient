import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav className="h-24 bg-gradient-to-r from-orange-400 via-red-600 to-red-700 flex items-center justify-between  px-4">
            <div className="flex items-center">
                <img src="/otaku.png" className="h-24"/>
                <div className="text-xs sm:text-xl md:text-4xl ml-2 2xl:ml-40 text-white">OTAKU LIBRARY</div>
            </div>
            <div className="text-xs mr-0 flex items-center sm:text-xl sm:mr-10 text-white">
               
                {isLoggedIn && (
                    <>
                        
                        <span className="mr-4">{user && user.name}</span>
                        <Link to={`/${user._id}`} className="mr-4">
                            <button>My Page</button>
                        </Link>
                        <Link to={`/`} className="mr-4">
                            <button>Anime Page</button>
                        </Link>
                        <button onClick={logOutUser} className="mr-4">Logout</button>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <Link to="/signup" className="mr-4">
                            <button>Sign Up</button>
                        </Link>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;