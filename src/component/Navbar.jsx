import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
// import { useAuth } from "../contexts/AuthContext";

function Navbar() {
    const { currentUser, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-gray-800">
                            LetterDrive
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                                    Dashboard
                                </Link>
                                <Link to="/editor" className="text-gray-600 hover:text-gray-900">
                                    New Letter
                                </Link>
                                <div className="text-sm text-gray-500">
                                    <span>{currentUser.email}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="btn bg-transparent text-red-600 hover:bg-red-50 border border-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
