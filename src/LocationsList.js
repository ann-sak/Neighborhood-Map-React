import React from 'react';
import './App.css';

function LocationsList (props) {


  return (
    <div >
      <ul className="locationsList">
        {props.findLocations.map((location) => (
          <li
            key = {location.id}  >
              <button
                className="listButton"
                onClick = {() => props.selectLocations(location)}>

              {location.name}
              </button>
          </li>

        ))}
      </ul>
    </div>
    );
}

export default LocationsList;
