import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class MapContainer extends Component {
  state = {
    locations: [
      {name: "Kino Nawojka", location: {lat: 52.8430759, lng: 19.1773195}},
      {name: "Nowe Centrum Lipna", location: {lat: 52.846243, lng: 19.178159}},
      {name: "Park Miejski", location: {lat: 52.8403201, lng: 19.1817102}},
      {name: "Urząd Miejski", location: {lat: 52.8456906, lng: 19.1804845}},
      {name: "Liceum Ogólnokształcące", location: {lat: 52.8505664, lng: 19.1788644}},

    ],
    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow()
  }

  componentDidMount() {
    this.loadMap()
    this.clickList()
  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props
      const maps = google.maps

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)

      const mapConfig = Object.assign({}, {
        center: {lat: 52.845863, lng: 19.181319},
        zoom: 13,
        mapTypeId: 'roadmap'
      })

      this.map = new maps.Map(node, mapConfig)
      this.addMarkers()
    }
  }

  clickList = () => {
    const clickedItem = this
    const {infowindow} = this.state
    const displayInfowindow = (event) => {
    const markerIndex = this.state.markers.findIndex(m => m.title.toLowerCase() === event.target.innerText.toLowerCase())

    clickedItem.populateInfoWindow(this.state.markers[markerIndex], infowindow)
    }

    const list = document.querySelector('.list')
    list.addEventListener('click', function (event) {
      if(event.target && event.target.nodeName === "LI") {
        displayInfowindow(event)
      }
    })
  }

  addMarkers = () => {
    const {google} = this.props
    let {infowindow} = this.state
    const bounds = new google.maps.LatLngBounds();

    this.state.locations.forEach( (location, ind) => {
      const marker = new google.maps.Marker({
        position: {lat: location.location.lat, lng: location.location.lng},
        map: this.map,
        title: location.name,
        animation: google.maps.Animation.DROP,
      });

      marker.addListener('click', () => {
        this.populateInfoWindow(marker, infowindow)
      })
      this.setState((state) => ({
      markers: [...state.markers, marker]
      }))
      bounds.extend(marker.position)
    })
    this.map.fitBounds(bounds)
  }

  populateInfoWindow = (marker, infowindow) => {
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent(`<h3>` + marker.title + `</h3>
        <br><h4>user likes it</h4>`);
      infowindow.open(this.map, marker);
      infowindow.addListener('closeclick', () => {
        infowindow.marker = null;
      });
    }
  }

  render() {
    const {markers} = this.state
    return(
      <div>
        <div className="container">
          <div className="text-input">
            <ul className="list"> {
              markers.map((m,i) =>(<li key = {i} className="link">{m.title}</li>))
            }
            </ul>
          </div>

          <div role="application" className="map" ref="map">
            loading map...
          </div>
        </div>
      </div>
    )
  }
}

export default MapContainer
