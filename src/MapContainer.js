import React, { Component } from 'react'
import { GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react'
import './App.css';


let foursquare = require('react-foursquare')({
  clientID: 'TNIDIKHEBFPJR3WMZMUPRLSN4ZO1HM3TTT5AFY4IUVQAM3BT',
  clientSecret: 'GJXIBH2A2UQJHFJKHWFHRAKSTVMBYNYN44OUQ0VISHFZSJUX'
})



class MapContainer extends React.Component {
  render() {
    const {locations, onMarkerClick, infowindow, checkedMarker, location, data, google, markers} = this.props




    return(
      <div>
        <Map
            google={this.props.google}
            zoom={ 14 }
            initialCenter = {{
              lat: 52.845863,
              lng: 19.181319
            }}>

              {
                locations.map(( location, i) => (
                  <Marker
                    ref={this.props.markersArray}
                    onClick = {(props, marker) =>
                      onMarkerClick(props,marker)
                    }
                    key={location.name}
                    id={location.id}
                    name={location.name}
                    position={
                      {lat: location.position.lat,
                      lng: location.position.lng}
                    } />
                ))
              }
              {
                <InfoWindow
                  marker={checkedMarker}
                  visible={infowindow}>
                  <h1>{location.name}</h1>
                </InfoWindow>
              }
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyATLu0j9Yd3EsjqYrQiXCCfTe1HNHPBE_I'
})(MapContainer)
