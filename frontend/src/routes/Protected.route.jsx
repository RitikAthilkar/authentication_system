import React from 'react'
import { useAuth } from '../../global/authContext'

const ProtectedRoute = ({children}) => {

    const { isAuth, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }



    return children

}

export default ProtectedRoute
