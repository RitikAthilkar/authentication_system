import { useState } from "react"
import React from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../global/authContext"
const Login = () => {
  const [form, setForm] = useState({})
  const { checkAuth } = useAuth()
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, form, {
        withCredentials: true
      })
      if (res.data.success === true) {
        alert(res.data?.message)
        localStorage.setItem('accessToken', res.data.accessToken)
        await checkAuth();
        navigate('/')
      } 
    } catch (error) {
      alert(`${error.response?.data?.message} !`)
    }
  }
  return (
    <>
      <div className='h-dvh w-screen flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='w-[30vw] border border-gray-400 rounded-xl shadow-xl p-3'>
          <div className='mb-2 flex justify-center'>
            <h2 className='text-xl font-semibold'>Login Form</h2>
          </div>

          <div className='mb-2 flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' placeholder='Enter Email' className='text-md p-1 focus:outline-0 border border-gray-400' onChange={handleChange} />
          </div>
          <div className='mb-2 flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input type='text' name='password' id='password' placeholder='Enter Password' className='text-md p-1 focus:outline-0 border border-gray-400' onChange={handleChange} />
          </div>
          <div className='mb-2 flex flex-col'>
            <button type='submit' className='bg-orange-500 text-md text-white w-20 p-1 rounded-lg hover:bg-orange-600 cursor-pointer'>Submit</button>
          </div>
          <h1 className="text-xs">Don't have account? <span className="text-orange-500 cursor-pointer" onClick={()=>{navigate('/register')}}>  Register </span></h1>
        </form>
      </div>
    </>

  )
}

export default Login
