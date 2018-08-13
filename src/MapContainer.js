import React from 'react'
import { GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react'
import './App.css';





class MapContainer extends React.Component {


  render() {
    const {locations, onMarkerClick, infowindow, checkedMarker, location,country, data} = this.props


      // Add the marker object to the corresponding entry in location array




    return(
      <div>
        <Map

            google={this.props.google}
            zoom={ 14 }
            initialCenter = {{
              lat:51.9427566,
              lng:15.515043
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
                      {lat: location.location.lat,
                      lng: location.location.lng}
                    } />
                ))
              }

              {
                <InfoWindow
                  marker={checkedMarker}
                  visible={infowindow}
                  country={country}
                  >
                  <div
                      style={{
                        width: '250px',
                        height: '300px',
                        margin: 'auto',
                        textAlign: 'center',
                        display:'block',
                        fontFamily: 'Noto Sans'
                      }}>
                  <h1>{location.name}</h1>
                  {
                 //additional verification to pass the elements fetched from wikipedia
                 data.filter(info => info.id === location.id )
                 .map(info =>{
                   let wikiInfo = info.text;
                   return (
                   <span  key={location.id}>
                     {/*here we pass a snippet text fetched from wikipedia*/}
                     <p
                       dangerouslySetInnerHTML={ {__html: wikiInfo} }
                       style={{
                         fontSize: '1.1em',
                         padding: '0 5px 7px 0'
                       }}
                       tabIndex='0'
                       />
                     {/*here we create a button (link) to redirect them to the relevant wikipedia page*/}
                     <a
                       href={info.url}
                       target="_blank"
                       className="infoButton"
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
