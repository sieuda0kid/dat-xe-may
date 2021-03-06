import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper,Polyline } from "google-maps-react";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import { Button, CardContent } from "@material-ui/core";
import {connect} from 'react-redux';
import {updateTripLocation} from '../../store/actions/trip.js';
import {getAddressFromLatLng} from '../../store/actions/user.js';
import { socket } from "../../Utils/Distance.js";
class CheckRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
        address: this.props.infoTrip.customerAddress,
        lat: this.props.infoTrip.tripLatitude,
        lng: this.props.infoTrip.tripLongitude,
        id: this.props.infoTrip.id,
        openp: false,

    };
  }
  mapClicked(mapProps, map, clickEvent) {
    this.setState({
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    });
    console.log("lat: "+ this.state.lat);
    console.log("lng: "+ this.state.lng);
    var location = {
      lat: this.state.lat,
      lng: this.state.lng,
    }
    this.props.doGetAddressFromLatLng(location)
    .then(res=>{
      this.setState({address: res.object.address});
    })
    .catch(error =>{
      console.log(error);
    })
  }

  handleClose = () => {
    const { open } = this.props;
    this.setState({ open: open });
  };

  ConfirmClick = () => {
    var trip= {
      id: this.state.id,
      tripLocation: this.state.lat+','+this.state.lng,
      tripLat: this.state.lat,
      tripLong: this.state.lng,
    };
    this.props.doUpdateTripLocation(trip)
      .then(resJson => {
        if(resJson.returnCode == 1){
          var requestLocation = {
            id: trip.id,
            tripLatitude: trip.tripLat,
            tripLongitude: trip.tripLong,
            status: this.props.infoTrip.status,
          }
          console.log("request location:"+ requestLocation);
          socket.emit("request-client",requestLocation);
          this.props._confirm();
        }
      })
      .catch(error =>{
        console.log(error)
      })
  }

  render() {
    const { lat, lng } = this.state;
    const { classes, infoTrip } = this.props;

    return (
      <Modal open={this.props.open} onClose={this.handleClose}>
        <div className={classes.paper}>
          <Card>
            <CardHeader color="primary">
              <h2>
                THÔNG TIN ĐỊA CHỈ: {this.state.address}
              </h2>
            </CardHeader>
            <div style={{ flex: 1, height: window.innerHeight }}>
            
              <Map
                google={this.props.google}
                zoom={14}
                initialCenter={{
                  lat: lat,
                  lng: lng
                }}
                gestureHandling={"cooperative"}
                style={styles.mapStyle}
                onClick={this.mapClicked.bind(this)}
              >
                <Marker
                  onClick={() => {
                    alert(1);
                  }}
                  name={"Current location"}
                  position={{ lat: lat, lng: lng }}
                />
              </Map>
            </div>
          </Card>
          <div style={{ display: "flex", flexDirection: "row",position:"absolute",bottom:10,right:10 }}>
          <CardContent>
              <Button
                variant="contained"
                color="secondary"
                style={{ fontSize: 12, width: 120 }}
                onClick={this.props._closeDialog}
              >
                Huỷ
              </Button>
            </CardContent>
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                style={{ fontSize: 12, color: "white", width: 120 }}
                onClick={()=>this.ConfirmClick()}
              >
                Xác nhận
              </Button>
            </CardContent>
          </div>
        </div>
      </Modal>
    );
  }
}

const styles = theme => ({
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
});


const mapDispatchToProps = dispatch => {
  return {
    doUpdateTripLocation: (trip) => dispatch(updateTripLocation(trip)),
    doGetAddressFromLatLng: (location) => dispatch(getAddressFromLatLng(location)),
  };
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})(withStyles(styles)(connect(null, mapDispatchToProps)(CheckRequest)));
