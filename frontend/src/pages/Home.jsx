import React from 'react'
import { useAuth } from '../../global/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const { setUser, setIsAuth } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
    
        await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
            {},
            { withCredentials: true }
        )
        
        localStorage.removeItem("accessToken")
        setUser(null)
        setIsAuth(false)
        navigate("/")
    }
  return (
    <div className='h-dvh w-screen flex flex-col justify-center items-center'>
          <h1 className='text-4xl p-4 rounded-xl shadow'>Hii! Welcome To Zygobite Dashboard</h1>
          <button className='p-2 rounded-lg bg-orange-500 text-white text-xl mt-3 ' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
