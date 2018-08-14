import React from 'react'
import { GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react'
import './App.css';

class MapContainer extends React.Component {
  render() {
    const {google, locations, onMarkerClick, infowindow, checkedMarker, location, data} = this.props

    return(
      <div>
        <Map

            google={this.props.google}
            zoom={ 14 }
            initialCenter = {{
              lat:51.9427566,
              lng:15.515043
            }}
            animation = {
              google.maps.Animation.DROP
            }
            >

              {
                locations.map(( checkedLocation, i) => (
                  <Marker
                    ref={this.props.markersArray}
                    onClick = {(props, marker) =>
                      onMarkerClick(props,marker)
                    }
                    key={checkedLocation.name}
                    id={checkedLocation.id}
                    name={checkedLocation.name}
                    position={
                      {lat: checkedLocation.location.lat,
                      lng: checkedLocation.location.lng}
                    }
                    animation = {
                      (location.name === checkedLocation.name)
                      && google.maps.Animation.BOUNCE
                    }
                     />
                ))
              }

              {
                <InfoWindow
                  marker={checkedMarker}
                  visible={infowindow}
                  >
                  <div className="infowindow"
                      >
                  <h1>{location.name}</h1>
                  {
                 //additional verification to pass the elements fetched from wikipedia
                 data.filter(info => info.id === location.id )
                 .map(info =>{
                   let wikiInfo = info.text;
                   return (
                   <span  key={location.id}>
                   <p
                       dangerouslySetInnerHTML={ {__html: wikiInfo} }
                       style={{
                         fontSize: '1.1em',
                         padding: '0 5px 7px 0'
                       }}
                       tabIndex='0'
                       />
                     <a
                      className="readmoreButton"
                       href={info.url}
                       target="_blank"

                       aria-label={`click to learn more about ${location.name}`}
                       tabIndex='0'
                     >
                       {info.readMore}</a>
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
