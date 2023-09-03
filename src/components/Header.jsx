import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

function Header() {
  return (
    <nav id='nav_cont'>
      <header>
        Dictionary App
      </header>

      <section>
        <label><Link to='home'>Home</Link></label>
        <label><Link to='history'>History</Link></label>
      </section>
      
    </nav>
  )
}

export default Header