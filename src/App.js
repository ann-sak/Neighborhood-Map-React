import React, { Component } from 'react'
import './App.css';
import escapeRegExp from 'escape-string-regexp';

import MapContainer from './MapContainer.js'
import Header from './Header.js'
import Hamburger from './Hamburger.js';





class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
      locations: [
      {name: "Bakalarka", location: {lat: 52.8427341, lng: 19.1858564}, id: '4de0b7758877aab7fe5169fc'},
      {name: "Hotel Korona", location: {lat: 52.8466773, lng: 19.1801208}, id: '4d07cd07f379a093c900e83c'},
      {name: "Złota Rybka", location: {lat: 52.8505924, lng: 19.2010255}, id: '4f9d2d23e4b0de626872f379'},
      {name: "Bulwar Poli Negri", location: {lat: 52.8526713, lng: 19.1754019}, id: '4fc014a2e4b021b6df552eb7'},
      {name: "Supermarket", location: {lat:52.8530244, lng:19.1776207}, id: '51d0015f498ec004ccc6c83e'}
    ],

      query: '',
      markers: [],
      location: {},
      infowindow: false,
      checkedMarker:{},
      country:{},
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

  onMarkerClick = (props, marker, e) => {
    this.setState({
      location: props,
      checkedMarker: marker,
      infowindow: true
    })
    this.state.locations.map((location) => {
      this.getFoursquareInfo(location.id)
    })
  }


  selectLocations = (location) => {
    for (const newMarker of this.state.markers) {
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


    getFoursquareInfo(id) {
      const country = this.state.country
      const {locations, infowindow} = this.state
      const clientID = 'TNIDIKHEBFPJR3WMZMUPRLSN4ZO1HM3TTT5AFY4IUVQAM3BT';
      const clientSecret = 'GJXIBH2A2UQJHFJKHWFHRAKSTVMBYNYN44OUQ0VISHFZSJUX';
      const url = `https://api.foursquare.com/v2/venues/${id}?client_id=${clientID}&client_secret=${clientSecret}&v=20180803`

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then((info) => {

          this.setState(
            country: ({country: info.response.venue.location.country})
          )
            console.log(country)

        })
        .catch(() => {
          console.log("<p>Oops, there was an issue retrieving info from Foursquare!</p>")
        })
    }








  render() {
    const {locations, infowindow, checkedMarker, location, street, markers} = this.state

    let findLocations
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      findLocations = locations.filter((location) => match.test(location.name))
    } else {
      findLocations = locations
    }

    let openMenu
    if (this.state.listOpen) {
      openMenu = <Header
        locations={locations}
        selectLocations={this.selectLocations}
        updateQuery={this.updateQuery}
        findLocations={findLocations}
        className
      />
    }


    return (
      <div className="container">
          <h1 className="heading">Neighborhood Map </h1>
          <Hamburger
            className="hamburger"
            toggleList={this.toggleList}
          />
          {openMenu}
          <MapContainer
            className="map"
            markers={markers}
            locations = {findLocations}
            infowindow = {infowindow}
            street={street}
            checkedMarker={checkedMarker}
            location={location}
            foursquare={this.getFoursquareInfo}
            onMarkerClick={this.onMarkerClick}
            markersArray={this.markersArray}

         />
      </div>
    );
  }
}



export default App
