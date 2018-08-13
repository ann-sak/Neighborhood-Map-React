import React, { Component } from 'react';

import './App.css';

import LocationsList from './LocationsList.js';
import Search from './Search.js';


class Header extends Component {

render() {
  return (
    <div className="header">
      <Search
        query={this.props.query}
        updateQuery={this.props.updateQuery}
        findLocations={this.props.findLocations}
      />
      <LocationsList
        locations={this.props.locations}
        selectLocations={this.props.selectLocations}
        findLocations={this.props.findLocations}
        />
    </div>
    );
}
}
export default Header;
