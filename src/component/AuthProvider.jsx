import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/auth/current-user`, {
                    withCredentials: true,
                });

                if (res.data.user) {
                    setCurrentUser(res.data.user);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const login = () => {
        window.location.href = `${API_URL}/api/auth/google`;
    };

    const logout = async () => {
        try {
            await axios.get(`${API_URL}/api/auth/logout`, {
                withCredentials: true,
            });
            setCurrentUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const value = {
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
