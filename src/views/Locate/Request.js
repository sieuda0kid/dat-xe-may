import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";

class Request extends Component {
  constructor(props) {
    super(props)
    const {history}= this.props
    // const infoTrip = history.location.state.infoTrip
    
    this.state = {
      // address:infoTrip.customerAddress,
      // lat: infoTrip.tripLatitude,
      // lng:infoTrip.tripLongitude
      address: "",
      lat: "",
      lng: "",
    }
  }
  mapClicked(mapProps, map, clickEvent) {
    this.setState({
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    })
  }
  componentDidMount(){
    console.log("history: "+ history.location.state);
  }
  render() {
    const { lat, lng } = this.state

    return (
      <GridContainer >
        <Card>
          <CardHeader color="primary">
            <h2>THÔNG TIN ĐỊA CHỈ: {this.state.address}</h2>
          </CardHeader>
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
        </Card>
      </GridContainer>
    );
  }
}

const styles = {
  mapStyle: {
    flex: 1,paddingBottom:50
  }
};
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ")
})(Request)