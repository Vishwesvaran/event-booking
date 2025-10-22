import { createContext, useContext, useEffect, useState } from "react"
import { getAuthToken, getUserById, isTokenValid, removeAuthToken, setAuthToken } from '../utils/auth.ts';
import axios from "axios";
import { api_url } from "../utils/index.ts";
import type { LoginProps } from "../types/index";

interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    login: (data: LoginProps) => Promise<void>;
    signUp: (data: LoginProps) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    loginError: string,
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        const token = getAuthToken()
        if (token) {
            verifyUser(token)
        } else setLoading(false);
    }, [])

    const verifyUser = async (token: string) => {
        try {
            if (token && isTokenValid(token)) {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const userData = await getUserById(decoded.userId, token)
                setUser(userData)
                setLoading(false)
                setIsAuthenticated(true)
            } else {
                logout()
            }
        } catch (error: any) {
            console.log(error)
            logout()
        }

    }

    const signUp = async (data: LoginProps) => {
        try {
            const response = await axios.post(`${api_url}/auth/register`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response) {
                setUser(response.data.data.user)
                setAuthToken(response.data.data.token)
                setIsAuthenticated(true)
            }
        } catch (error:any) {
            console.log(error)
            setLoginError(error?.response?.data?.error)
        }
    }

    const login = async (data: LoginProps) => {
        try {
            const response = await axios.post(`${api_url}/auth/login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response) {
                setUser(response.data.data.user)
                setAuthToken(response.data.data.token)
                setIsAuthenticated(true)
            }
        } catch (error: any) {
            console.log(error)
            setLoginError(error?.response?.data?.error)
        }
    }

    const logout = async () => {
        setUser(null);
        removeAuthToken();
        setIsAuthenticated(false);
    }


    return (
        <AuthContext.Provider value={{ user, login, signUp, logout, loading, isAuthenticated, loginError }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

