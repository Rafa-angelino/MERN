import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>Todos usuários</NavLink>
      </li>
      <li>
        <NavLink to='/u1/places'>Meus lugares</NavLink>
      </li>
      <li>
        <NavLink to='/places/new'>Adicionar lugar</NavLink>
      </li>
      <li>
        <NavLink to='/auth'>Authenticate</NavLink>
      </li>
    </ul>
  )
}

export default NavLinks
