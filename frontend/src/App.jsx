import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthProvider, useAuth } from '../global/authContext'
import Authentication from './pages/Authentication'
import AuthRoute from './routes/Auth.route'
import ProtectedRoute from './routes/Protected.route'

function App() {
  // function MainRoute() {

  //   const { isAuth, loading } = useAuth()

  //   if (loading) return <div className='flex justify-center items-center text-xl h-screen'>Loading is in process please wait</div>

  //   return isAuth ? <Home /> : <Authentication />
  // }

  return (
    <>

      <AuthProvider>
        <Routes>
          {/* <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} /> */}
          <Route path='/' element={<AuthRoute><Authentication /></AuthRoute>} />
           <Route path='/dashboard' element={<ProtectedRoute><Home /></ProtectedRoute>} />
           {/* <Route path='/dashboard' element={<Home /> }/> */}
          {/* <Route path="/" element={<MainRoute />} /> */}
          {/* <Route path="/login" element={<Authentication />} /> */}
        </Routes>
      </AuthProvider>
        

    </>
  )
}

export default App
