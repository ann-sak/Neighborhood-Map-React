import React, { Component } from 'react';

import './App.css';

import LocationsList from './LocationsList.js';
import Search from './Search.js';


class Header extends Component {
  render () {
    return (
      <header >
        <h2 className="slogan">Neighboor Map</h2>
      </header>
    );
  }
}

export default Header;
