import React from 'react';

import './App.css';

function Search (props) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        value = {props.query}
        onChange = {(event) => props.updateQuery(event.target.value)}
        tabIndex='0'
        aria-label="Search for a location"
      />
    </div>
  );
}

export default Search;
