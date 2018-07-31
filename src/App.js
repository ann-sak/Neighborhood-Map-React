import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';
import Foursquare from 'react-foursquare'

import MapContainer from './MapContainer.js'
import InfoWindow from './Infowindow.js'



class App extends Component {
  render() {
    return (
      <div>
        <a className="menu" tabIndex="0">
          <svg className="hamburger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23">
            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
          </svg>
        </a>
        <h1 className="heading"> Neighborhood Map (React) </h1>
        <MapContainer google={this.props.google} />
        <InfoWindow />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyATLu0j9Yd3EsjqYrQiXCCfTe1HNHPBE_I'
})(App)
