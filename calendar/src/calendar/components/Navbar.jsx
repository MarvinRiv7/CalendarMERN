import React from 'react'
import { useAuthStore } from '../../hooks/useAuthStote'

export const Navbar = () => {

  const {startLogout, user} = useAuthStore()

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            <i className='fas fa-calendar-alt'></i>
            &nbsp;
            {user.name}
        </span>

        <button 
        onClick={startLogout}
        className='btn btn-outline-danger'>
            <i className='fas fa-sign-out-alt'></i>
            <span>
            &nbsp;
              Salir</span>
        </button>
    </div>
  )
}
