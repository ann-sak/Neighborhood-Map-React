import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MapContainer from './MapContainer.js'


class InfoWindow extends Component {
  //const marker = this.state

  componentDidMount(marker) {
    let reqURL = `https://api.foursquare.com/v2/venues/search?ll=${marker.position.lat},${marker.position.lng}&client_id=${clientID}&client_secret=${clientSecret}&v=20180726&query=${this.title}`;
    const clientID = 'TNIDIKHEBFPJR3WMZMUPRLSN4ZO1HM3TTT5AFY4IUVQAM3BT';
    const clientSecret = 'GJXIBH2A2UQJHFJKHWFHRAKSTVMBYNYN44OUQ0VISHFZSJUX';
    const foursquare = foursquare.venues.getVenues(reqURL)
      .then(res => {
      //const {infowindow, marker} = this.state
        this.setState({street: res.response.venues});
        this.setState({city: res.response.venues});
        this.setState({phone: res.response.venues});
        console.log('sukces');
      }).catch(alert('Something went wrong with foursquare'));
  }

  openModal = () => {
    const {infowindow} = this.state
    if (infowindow) {




      }

    }


  render() {
    return(
      <div>
        <h3>title</h3>
        <button className="details-button"
                onClick={(event) => {
                  this.openModal();
                }}>Details</button>
      </div>
    );
  }
}

  export default InfoWindow
