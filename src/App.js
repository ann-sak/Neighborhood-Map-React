import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './App.css';
import escapeRegExp from 'escape-string-regexp';

import MapContainer from './MapContainer.js'
import Header from './Header.js'
import Hamburger from './Hamburger.js';



class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
      locations: require ('./data/locations.json'),
      query: '',
      markers: [],
      location: {},
      infowindow: false,
      checkedMarker:{},
      data:[],
      listOpen: true
    }
  }

  componentDidMount() {

  }

  updateQuery = (query) => {
    this.setState({query: query.trim() })
  }

  markersArray = (marker) => {
    if (marker !== null) {
      this.state.markers.push(marker)
    }
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    location: props,
    checkedMarker: marker,
    infowindow: true
  })

  selectLocations = (location) => {
    for (const newMarker of this.markers) {
      if (newMarker.props.name === location.name) {
        newMarker.props.google.maps.event.trigger(newMarker.marker, 'click')
      }
    }
  }

  toggleList = () => {
    this.setState((prevState) => {
      return {listOpen: !prevState.listOpen}
    })
  }

  render() {
    const {locations, infowindow, checkedMarker, location, data, markers} = this.state

    let findLocations
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.qury), 'i')
      findLocations = locations.filter((location) => match.test(location.name))
    } else {
      findLocations = locations
    }

    let menu;
    if (this.state.listOpen) {
      menu = <Header
        query = {this.state.query}
        updateQuery = {this.updateQuery}
        locations={findLocations}
        selectLocations={this.selectLocations}
        />
    }
    return (
      <div>
          <Header/>
          <MapContainer
            markers={markers}
            locations = {findLocations}
            infowindow = {infowindow}
            checkedMarker={checkedMarker}
            location={location}
            data={data}
            onMarkerClick={this.onMarkerClick}
            markersArray={this.markersArray}
         />
      </div>
    );
  }
}



export default App
