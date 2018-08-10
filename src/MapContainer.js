import React from 'react'
import { GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react'
import './App.css';




class MapContainer extends React.Component {
  render() {
    const {locations, onMarkerClick, infowindow, checkedMarker, location,foursquare,street} = this.props




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
                  <p>{street}</p>
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
