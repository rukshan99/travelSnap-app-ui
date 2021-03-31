import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
    const auth =  useContext(AuthContext);

    if(!auth) {
        return (
            <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Users
        </NavLink>
      </li>
        <li>
          <NavLink to="/auth">Sign in</NavLink>
        </li>
      
    </ul>
        );
    }
else {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Users
        </NavLink>
      </li>
      {auth.isSignedIn && (
        <li>
          <NavLink to="/u1/places">My places</NavLink>
        </li>
      )}
      {auth.isSignedIn && (
        <li>
          <NavLink to="/places/new">New place</NavLink>
        </li>
      )}
      {!auth.isSignedIn && (
        <li>
          <NavLink to="/auth">Sign in</NavLink>
        </li>
      )}
    </ul>
  );
      }
};

export default NavLinks;
