import { Navigate } from "react-router-dom"
import { useAuth } from "../../global/authContext"

const PublicRoute = ({ children }) => {
    const { isAuth, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    if (isAuth) {
        return <Navigate to="/" replace />
    }

    return children
}

export default PublicRoute