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
      locations: require ('./data/locations.json'),
      query: '',
      markers: [],
      location: {},
      infowindow: false,
      checkedMarker:{},
      data:[],
      listOpen: true,
      street:'',
      city:'',
      country:''

    }
  }

  componentDidMount() {
    this.getFoursquareInfo();
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


  getFoursquareInfo = () => {
    const {locations} = this.state
    // Foursquare API Client

      const clientID = 'TNIDIKHEBFPJR3WMZMUPRLSN4ZO1HM3TTT5AFY4IUVQAM3BT';
      const clientSecret = 'GJXIBH2A2UQJHFJKHWFHRAKSTVMBYNYN44OUQ0VISHFZSJUX';

      const $ = require('jquery');

      /*his.state.locations.map((location) => {
        return fetch (`https://api.foursquare.com/v2/venues/search?ll=${location.position.lat},${location.position.lng}&client_id=${clientID}&client_secret=${clientSecret}&v=20180726`)
      })*/
      // get JSON request of foursquare data
      //let reqURL = baseURL + locations.lat + ',' + locations.lng + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20180726'
      let reqURL = `https://api.foursquare.com/v2/venues/search?ll=` + locations.position.lat + `,` + this.locations.position.lng `&client_id=` + clientID + `&client_secret=` + clientSecret + `&v=20180726`;
       $.getJSON(reqURL).done(function(data) {
         var results = data.response.venues[0];
          this.setState({street: results.location.formattedAddress[0]});
          this.setState((state) => ({city: results.location.formattedAddress[1]}));
          this.setState((state) => ({country: results.location.formattedAddress[2]}));
      }).fail(function() {
        alert('Something went wrong with foursquare');
        console.log(reqURL)
       });
  }

  render() {
    const {locations, infowindow, checkedMarker, location, data, markers} = this.state

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
      />
    }


    return (
      <div>
          <h1>Neighboorhood Map </h1>
          <Hamburger
            toggleList={this.toggleList}
          />
          {openMenu}
          <MapContainer
            markers={markers}
            locations = {findLocations}
            infowindow = {infowindow}
            foursquare = {this.getFoursquareInfo}
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
