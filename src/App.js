import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp';

import './App.css';

import MapContainer from './MapContainer.js'
import Sidebar from './Sidebar.js'
import Hamburger from './Hamburger.js';


//loading an information about fail with loading the Google Api 
window.gm_authFailure = () => {
  const mapSection = document.querySelector('.container');
  mapSection.innerHTML =
  `<div class='error'>
      <p>There is a proble with loading Google Maps</p>
    </div>`;
}

class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
      //Array of my locations
      locations: [
        {name: "Zielona Góra", location: {lat: 51.9424634, lng: 15.5207873}, id: '1'},
        {name: "University of Zielona Góra", location: {lat: 51.933138, lng: 15.5023958}, id: '2'},
        {name: "CRS Hall Zielona Góra", location: {lat:51.956455, lng: 15.5224673}, id: '3'},
        {name: "Luksusowa (vodka)", location: {lat:51.9376308, lng:15.4962061}, id: '4'},
        {name: "Zielona Góra Wine Fest", location: {lat:51.9369747, lng:15.5099471}, id: '5'}
      ],
      //text putted to the search bar
      query: '',
      //active marker
      markers: [],
      //selected location
      location: {},
      //the array to storage data from Wikipedia
      data:[],
      //infowindow
      infowindow: false,
      //checked marker
      checkedMarker:{},
      //to toggle the LocationsList
      listOpen: true
    }
  }

  componentDidMount() {
    //Initiating the Wikipedia function
    this.wiki()
   }

  //pushing the marker to the active markers array
  markersArray = (marker) => {
    if (marker !== null) {
      this.state.markers.push(marker)
    }
  }

  //updating the searching
  updateQuery = (query) => {
    this.setState({query: query.trim() })
  }

  //selecting the marker and openning infowindow
  onMarkerClick = (props, marker, e) => {
    this.setState({
      location: props,
      checkedMarker: marker,
      infowindow: true
    })
  }

  //matching the markers with LocationsList
  selectLocations = (location) => {
    for (const newMarker of this.state.markers) {
      if (newMarker.props.name === location.name) {
        newMarker.props.google.maps.event.trigger(newMarker.marker, 'click')
      }
    }
  }

  //toggle LocationsList by clicking the hamburger
  toggleList = () => {
    this.setState((prevState) => {
      return {listOpen: !prevState.listOpen}
    })
  }

  //getting data from Wikipedia
  wiki = () => {
    let newData = [];
    let wikiFailed = [];
    this.state.locations.map((location) => {
      //fetching the object from the database
      return fetch(`https://en.wikipedia.org/w/api.php?&action=query&list=search&prop=extracts&titles&format=json&origin=*&srlimit=1&srsearch=${location.name}`, {
      })

        //converting to json format
      .then(response => response.json())

      //creating an object from data
      .then(data => {
          let url = encodeURI(`https://en.wikipedia.org/wiki/${data.query.search['0'].title}`);
          let element = {
            text: data.query.search['0'].snippet,
            id: location.id,
            name: location.name,
            url: url,
            readMore: 'Read more'
          };
          newData.push(element);
          this.setState({data: newData});
    		})

        //Error handling
      .catch(() => {
          console.log('Error')
          let element = {
            id: location.id,
            text: "Data from Wikipedia is gone"
          }
          wikiFailed.push(element);
          this.setState({data: wikiFailed});
      })
    })
  }

  render() {
    const {locations, infowindow, checkedMarker, location, country, markers, data} = this.state

    //filtering LocationsList with query
    let findLocations
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      findLocations = locations.filter((location) => match.test(location.name))
    } else {
      findLocations = locations
    }

    //handling the LocationsList
    let openMenu
    if (this.state.listOpen) {
      openMenu = <Sidebar //<------LocationsList and Search input
        locations={locations}
        selectLocations={this.selectLocations}
        updateQuery={this.updateQuery}
        findLocations={findLocations}
      />
    }


    return (
      <div className="container">
        <div className="navigation">
          <Hamburger//<----Hamburger
            toggleList={this.toggleList}
            aria-label="open-hide the sidebar"
          />

          <h1 className="heading">Neighborhood Map </h1>{/*<-----Title*/}
        </div>

        <div className="content">

          {openMenu} {/*<------LocationsList and Search input*/}
          <div className="map">
            <MapContainer//<---MapContainer
              markers={markers}
              locations = {findLocations}
              infowindow = {infowindow}
              country={country}
              data={data}
              checkedMarker={checkedMarker}
              location={location}
              foursquare={this.getFoursquareInfo}
              onMarkerClick={this.onMarkerClick}
              markersArray={this.markersArray}
           />
          </div>
        </div>
      </div>
    );
  }
}

export default App
