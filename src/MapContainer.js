import React from 'react'
import { GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react'

import './App.css';

class MapContainer extends React.Component {
  render() {
    const {google, locations, onMarkerClick, infowindow, checkedMarker, location, data} = this.props

    return(
      <div tabIndex='0'>
        <Map//<---Default map
          google={this.props.google}
          zoom={ 14 }
          initialCenter = {{
            lat:51.9427566,
            lng:15.515043
          }}
        >
        {
          //looping through all locations to show markers
          locations.map(( checkedLocation, i) => (
              <Marker
                  onClick = {(props, marker) =>
                    onMarkerClick(props,marker)
                  }
                  key={checkedLocation.name}
                  id={checkedLocation.id}
                  name={checkedLocation.name}
                  tabIndex='0'
                  ref={this.props.markersArray}
                  position={
                    {lat: checkedLocation.location.lat,
                    lng: checkedLocation.location.lng}
                  }
                  animation = {
                    (location.name === checkedLocation.name)
                    && google.maps.Animation.BOUNCE //<---animating the selected marker
                  }
               />
          ))
        }

        {
          //populating infowindow
          <InfoWindow
            marker={checkedMarker}
            visible={infowindow}
            aria-label={`Info about ${location.name}`}
          >
            <div className="infowindow">
              <h1 tabIndex='0'>{location.name}</h1>
              {
                //filtering the data from Wikipedia
               data.filter(info => info.id === location.id ).map(info => {
                 let wikiInfo = info.text;
                 return (
                   <span  key={location.id}>
                     <p
                       dangerouslySetInnerHTML={ {__html: wikiInfo} }
                       className = "wikiInfo"
                       tabIndex='0'
                     />
                     <a //link to article at Wikipedia
                      className="readmoreButton"
                      href={info.url}
                      target="_blank"
                      aria-label={`Click to read more about ${location.name}`}
                      tabIndex='0'
                      role="button"
                    >
                     {info.readMore}
                    </a>
                  </span>
                )}
                )
              }
            </div>

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
