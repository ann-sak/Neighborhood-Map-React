import React from 'react';
import './App.css';


function Hamburger (props) {
  return (
    <div
      onClick={props.toggleList}>
      <svg>
        <rect x={10} y={15} className="hamburger-element" width={40} height={4}/>
        <rect x={10} y={27} className="hamburger-element" width={40} height={4}/>
        <rect x={10} y={39} className="hamburger-element" width={40} height={4}/>
      </svg>
    </div>
  )
}

export default Hamburger;
