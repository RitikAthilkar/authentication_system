import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/auth/profile`,
                {   
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    },
                    withCredentials: true
                }
            )
 
            setIsAuth(true);
            setUser({ userId: res.data.userId, email: res.data.userId });
        } catch (error) {

            if (error.response?.status === 401) {

                try {
                    const refreshRes = await axios.post(
                        `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
                        {},
                        { withCredentials: true }
                    );

                    const newToken = refreshRes.data.accessToken;

                    localStorage.setItem("accessToken", newToken);

                    const res = await axios.get(
                        `${import.meta.env.VITE_SERVER_URL}/auth/profile`,
                        {
                            headers: {
                                Authorization: `Bearer ${newToken}`
                            },
                            withCredentials: true
                        }
                    )

                    setIsAuth(true);
                    setUser({ userId: res.data.userId, email: res.data.userId });

                } catch (refreshError) {
                    localStorage.removeItem("accessToken");
                    setIsAuth(false);
                    setUser(null);
                    navigate('/')
                }
            }
        }
         finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);


    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            user,
            setUser,
            loading,
            checkAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
 
}

export const useAuth = () => useContext(AuthContext);