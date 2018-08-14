import React from 'react';

import './App.css';

function LocationsList (props) {
  return (
    <div>
      <ul className="locationsList">
        {props.findLocations.map((location) => (
          <li
            key = {location.id}
          >
            <button
              className="listButton"
              onClick = {() => props.selectLocations(location)}
              aria-label={`Click to check the ${location.name} location and open its InfoWindow`}
              tabIndex='0'
            >
            {location.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationsList;
