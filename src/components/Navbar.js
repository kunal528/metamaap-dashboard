import React, { useEffect, useState } from 'react'
import './Navbar.css'
import useFirebase from '../adapters/useFirebase'
import { Link } from 'react-router-dom'
import useAccess from '../adapters/useAccess'

const Navbar = () => {
  const { logout,streamUser, getUserProfile } = useFirebase()
  const [user, changeUser] = useState(null)
  const [state, setState] = useState(null)
  useEffect(() => {
    streamUser((user) => {
      if (user) {
        changeUser(user)
        getUserProfile().then((profile) => setState(profile))
      }
      else {
        changeUser(null)
      }
    })
  }, [])
  return (
    <div className='navbar-container'>
        <img src="/logo512.png" className='navbar-brand'/>
        <div className='navbar-menu'>
          <Link to='/' className='navbar-menu-item'>Home</Link>
          {state && state.role === 'super admin' && <Link to='/users' className='navbar-menu-item'>Users</Link>}
        </div>
        <div className='navbar-admin'>
          <div className='admin-profile'>{user && user.email[0].toUpperCase()}</div>
          <div className='logout-button' onClick={logout}>Logout</div>
        </div>
    </div>
  )
}

export default Navbar