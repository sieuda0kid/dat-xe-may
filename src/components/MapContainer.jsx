import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class LocateRequestView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: "Nhà Thờ Đức Bà",
      lat: 10.7629123,
      lng: 106.6734333
     }
  }
  mapClicked(mapProps, map, clickEvent) {
    this.setState({
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    })
  }
  render() {
    const { lat, lng } = this.state
    return (
       
          <div style={{ flex: 1, height: window.innerHeight }}>
            <Map
              google={this.props.google}
              zoom={14}
              initialCenter={{
                lat: lat,
                lng: lng
              }}
              gestureHandling={'cooperative'}
              style={styles.mapStyle}
              onClick={this.mapClicked.bind(this)}
            >
              <Marker onClick={() => { alert(1) }}
                name={'Current location'}
                position={{ lat: lat, lng: lng }}
              />
            </Map>
          </div>
    );
  }
}

const styles = {
  mapStyle: {
    flex: 1,paddingBottom:50
  }
};
export default GoogleApiWrapper({
  apiKey: ("keygoogleapi")
})(LocateRequestView)