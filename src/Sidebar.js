import React, { Component } from 'react';

import './App.css';

import LocationsList from './LocationsList.js';
import Search from './Search.js';


class Sidebar extends Component {
render() {
  return (
    <div className="sidebar">
      <Search
        query={this.props.query}
        updateQuery={this.props.updateQuery}
        findLocations={this.props.findLocations}
        tabIndex='0'
        aria-label="Search for a location"
      />
      <LocationsList
        locations={this.props.locations}
        selectLocations={this.props.selectLocations}
        findLocations={this.props.findLocations}
        aria-label="List with locations"
        />
    </div>
    );
  }
}
export default Sidebar;
