import React from 'react';
import './App.css';

function Search (props) {


  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for a location"
        value = {props.query}
        onChange = {(event) => props.updateQuery(event.target.value)}
      />
    </div>
    );
}

export default Search;
