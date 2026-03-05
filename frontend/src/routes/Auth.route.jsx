import { Navigate } from "react-router-dom"
import { useAuth } from "../../global/authContext"

const AuthRoute = ({ children }) => {
    const { isAuth, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    if (isAuth) {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

export default AuthRoute