import React, { useCallback, useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Authentication = () => {
    const [showLogin,setShowLogin] = useState(true)
    const handleAuthPage = () =>{
      setShowLogin(!showLogin)
    }
  return (
    <>
      {showLogin?<>
              <Login handleClick={handleAuthPage}/>
      </>:<>
             <Register handleClick={handleAuthPage} />
      </>}
    </>
  )
}

export default Authentication
