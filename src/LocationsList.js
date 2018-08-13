import React from 'react';
import './App.css';

function LocationsList (props) {


  return (
    <div >
      <ul className="locationsList">
        {props.findLocations.map((location) => (
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
