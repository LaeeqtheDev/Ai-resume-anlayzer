import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to='/'>
            <p className='text-2xl font-bold text-gradient'>Resumind</p>
        </Link>

        <div className="flex items-center gap-4">
            <Link to='/dashboard' className='text-dark-200 font-medium'>Dashboard</Link>
            <Link to='/upload' className='primary-button w-fit'>Upload Resume</Link>
        </div>
    </nav>
  )
}

export default Navbar