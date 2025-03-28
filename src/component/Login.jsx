import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
// import { useAuth } from "../contexts/AuthContext";

import googleIcon from "../assets/google.svg";

function Login() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
            <div className="card p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome to LetterDrive</h1>
                <p className="text-gray-600 text-center mb-8">
                    Create, edit, and save letters directly to your Google Drive
                </p>
                <button
                    onClick={login}
                    className="flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                    <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

export default Login;
