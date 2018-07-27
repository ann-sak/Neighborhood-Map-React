import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import InfoWindow from './Infowindow.js'


class MapContainer extends Component {
  state = {
    locations: [
      //Add default locations
      {name: "Kino Nawojka", location: {lat: 52.8446729, lng: 19.1796138}},
      {name: "Nowe Centrum Lipna", location: {lat: 52.8446632, lng: 19.1770389}},
      {name: "Park Miejski", location: {lat: 52.8412546, lng: 19.1808583}},
      {name: "Urząd Miejski", location: {lat: 52.8453857, lng: 19.1834118}},
      {name: "Liceum Ogólnokształcące", location: {lat:52.8513319, lng:19.1798322}},

    ],
    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow(),
    checkedMarker:null,
    street: '',
	  city: '',
	  phone: ''

  }



  componentDidMount() {
    this.loadMap()
    this.clickList()
    //Change marker color when it is clicked
    this.setState({checkedMarker: this.makeMarkerIcon('ffffff')})



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
    } else {
      window.alert("There is a problem with map loading")
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

  handleChange = (event) => {
    this.setState({query: event.target.value})
  }

  addMarkers = () => {
    const {google} = this.props
    let {infowindow} = this.state
    const bounds = new google.maps.LatLngBounds()

    this.state.locations.forEach((location, ind) => {
      const marker = new google.maps.Marker({
        position: {lat: location.location.lat, lng: location.location.lng},
        map: this.map,
        title: location.name,
        animation: google.maps.Animation.DROP,
      })

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
    const defaultMarker = marker.getIcon()
    const {checkedMarker, markers} = this.state
    //const self = this

    if (infowindow.marker !== marker) {
      if (infowindow.marker) {
        const index = markers.findIndex(m => m.title === infowindow.marker.title)
        markers[index].setIcon(defaultMarker)


      }
      marker.setIcon(checkedMarker)
      infowindow.marker = marker



      infowindow.setContent(
        `<div><h3>${marker.title}</h3>` +
        `<br><button className="details-button" >Details</button></div>`)
      infowindow.open(this.map, marker)
      //const button = document.querySelector('.details-button')
          //  button.addListener('click', function () {})

      infowindow.addListener('closeclick', function () {
        infowindow.marker = marker.setIcon()
      })
    }
  }

  makeMarkerIcon = (markerColor) => {
    const {google} = this.props
    let markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +'|40|_|%E2%80%A2',
    )
    return markerImage;
  }

  render() {
    const {markers, query, locations, infowindow} = this.state

    if (query) {
      locations.forEach((location, index) => {
        if(location.name.toLowerCase().includes(query.toLowerCase())) {
          markers[index].setVisible(true)
        } else {
          if (infowindow.marker === markers[index]) {
            infowindow.close()
          }
          markers[index].setVisible(false)
        }
      })
    } else {
      locations.forEach((location, index) => {
        if (markers.length && markers[index]) {
          markers[index].setVisible(true)
        }
      })
    }


    return(
      <div>
        <div className="container">
          <div className="text-input">

            <ul className="list"> {
              markers.filter(m => m.getVisible()).map((m,i) =>(
                <li key = {i} className="link">{m.title}</li>
                ))
            }
            </ul>

            <input role="search" className="search"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>

          <div role="application" className="map" ref="map">
            <InfoWindow />
          </div>
        </div>
      </div>
    )
  }
}

export default MapContainer
