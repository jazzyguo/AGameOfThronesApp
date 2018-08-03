import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.css';

const NavBar = (props) => {  

  const { pathname } = props.location;

  return (
    <div className="navbar">
      <Link className={`navbar__link ${ pathname.includes('book') ? 'navbar__link--selected' : '' }`} 
            to='/books'>
            Books
      </Link>
      <Link className="navbar__link" to='/'>
            Home
      </Link>
      <Link className={`navbar__link ${ pathname.includes('houses') ? 'navbar__link--selected' : '' }`}
            to='/houses'>
            Houses
      </Link>
    </div>
  );
}

export default withRouter(NavBar);