import React, { Component } from 'react';

import './App.css';

import LocationsList from './LocationsList.js';
import Search from './Search.js';


class Header extends Component {

render() {
  return (
    <div>
      <Search
        query={this.props.query}
        updateQuery={this.props.updateQuery}
      />
      <LocationsList
        locations={this.props.locations}
        selectLocations={this.props.selectLocations}
        />
    </div>
    );
}
}
export default Header;
