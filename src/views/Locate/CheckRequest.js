import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper,Polyline } from "google-maps-react";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import { Button, CardContent, ClickAwayListener } from "@material-ui/core";
class CheckRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
        address: this.props.infoTrip.customerAddress,
        lat: this.props.infoTrip.tripLatitude,
        lng: this.props.infoTrip.tripLongitude,
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
  }

  handleClose = () => {
    const { open } = this.props;
    this.setState({ open: open });
  };

  render() {
    const { lat, lng } = this.state;
    const { classes, infoTrip } = this.props;
    const triangleCoords = [
        {lat: 10.7627345, lng: 106.6822347},
        {lat: 10.7628653, lng: 106.6826189},
        {lat: 10.7651904, lng: 106.6817614},
        {lat: 10.7676356, lng: 106.6746287}
      ];
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
              <Polyline
                path={triangleCoords}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2} />
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
const CheckRequestWithStyles = withStyles(styles)(
    CheckRequest
);
export default GoogleApiWrapper({
  apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})(CheckRequestWithStyles);
