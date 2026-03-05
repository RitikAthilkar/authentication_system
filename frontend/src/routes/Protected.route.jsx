import React from 'react'
import { useAuth } from '../../global/authContext'
import { Navigate } from "react-router-dom"
const ProtectedRoute = ({children}) => {

    const { isAuth, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    if (!isAuth) {
        return <Navigate to="/" replace />
    }



    return children

}

export default ProtectedRoute
