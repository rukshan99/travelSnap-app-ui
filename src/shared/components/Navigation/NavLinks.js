import React from 'react';
import { NavLink } from'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return(
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>All users</NavLink>
            </li>
            <li>
                <NavLink to="/user001/places">My places</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">New place</NavLink>
            </li>
            <li>
                <NavLink to="/auth">Sign in</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;