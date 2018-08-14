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
      {name: "Zielona Góra", location: {lat: 51.9424634, lng: 15.5207873}, id: '4de0b7758877aab7fe5169fc'},
      {name: "University of Zielona Góra", location: {lat: 51.933138, lng: 15.5023958}, id: '4d07cd07f379a093c900e83c'},
      {name: "CRS Hall Zielona Góra", location: {lat:51.956455, lng: 15.5224673}, id: '4f9d2d23e4b0de626872f379'},
      {name: "Luksusowa (vodka)", location: {lat:51.9376308, lng:15.4962061}, id: '4fc014a2e4b021b6df552eb7'},
      {name: "Zielona Góra Wine Fest", location: {lat:51.9369747, lng:15.5099471}, id: '51d0015f498ec004ccc6c83e'}
    ],

      query: '',
      markers: [],
      location: {},
      data:[],
      infowindow: false,
      checkedMarker:{},
      country:[],
      listOpen: true
    }
  }

  componentDidMount() {
    this.wiki()
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


  wiki = () => {
      let newData = [];
      let failedData = [];
      this.state.locations.map((location) => {
        //retriving the object from the JSON database using the title attribute
        return fetch(`https://en.wikipedia.org/w/api.php?&action=query&list=search&prop=extracts&titles&format=json&origin=*&srlimit=1&srsearch=${location.name}`, {
            headers: {
              'Origin': 'http://localhost:3000/',
              'Content-Type': 'application/json; charset=utf-8'
            }
          })
        //converting to json format
        .then(response => response.json())
        .then(data => {
          let url = encodeURI(`https://en.wikipedia.org/wiki/${data.query.search['0'].title}`);
          //creating an element according to the previously fetched data
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
        //Error handling function
        .catch(() => {
          console.log('An error occured')
          let element = {
            id: location.id,
            text: "Sorry, it wasn't possible to get any data from Wikipedia, please, try later",
            readMore: "☹"
          }
          failedData.push(element);
          this.setState({data: failedData});
        })
      })
    }








  render() {
    const {locations, infowindow, checkedMarker, location, country, markers,data} = this.state

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
      <div className="container">
        <div className="navigation">
          <Hamburger
            toggleList={this.toggleList}
          />

          <h1 className="heading">Neighborhood Map </h1>
        </div>
        <div className="content">
          {openMenu}
          <div className="map">
            <MapContainer
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
