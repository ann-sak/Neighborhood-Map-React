import React, { Component } from 'react';
import './App.css';

function LocationsList (props) {


  return (
    <div>
      <ul>
        {props.locations.map((location) => (
          <li
            key = {location.id}
            onClick = {() => props.selectLocations(location)}
          >
          {location.name}
          </li>

        ))}
      </ul>
    </div>
    );
}

export default LocationsList;
