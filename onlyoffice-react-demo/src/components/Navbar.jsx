import React from 'react';
import {
  Navbar as RNavbar,
  NavbarBrand,
} from 'reactstrap';
import saama_logo from "../assets/saama_logo.svg"

function Navbar() {

  return (
    <div>
      <RNavbar className='header header-sticky' dark>
        <NavbarBrand href="/">
          <img className='px-2 saama-logo' src={saama_logo} alt='saama logo' />
          <span className='mx-2'>Smart Protocol Document - (SPD)</span>
        </NavbarBrand>
      </RNavbar>
    </div>
  );
}

export default Navbar;
