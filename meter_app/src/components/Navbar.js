import React from 'react'
import {Link} from 'react-router-dom'
const NavBar=()=>{
    return(
        <nav>
        <div className="nav-wrapper white">
          <Link to="/" className="brand-logo left">Meter Reading Data</Link>
          <ul id="nav-mobile" className="right">
          <li><Link to="/">Home</Link></li>
           <li><Link to="/Meter">Meter</Link></li>
           <li><Link to="/About">About Us</Link></li>
          </ul>
        </div>
       </nav>
      )
  }
    
    export default NavBar