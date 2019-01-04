import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";
import polyUtil from 'polyline-encoded';
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import { Button, CardContent } from "@material-ui/core";
import { connect } from 'react-redux';
import { getArrayLocation } from '../../store/actions/trip.js';
import { socket } from "../../Utils/Distance.js";
class ShowRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.infoTrip.customerAddress,
            lat: this.props.infoTrip.tripLatitude,
            lng: this.props.infoTrip.tripLongitude,
            id: this.props.infoTrip.id,
            status: this.props.infoTrip.status,
            openp: false,
            locationDriver: '',
            steps: [],
        };
    }

    handleClose = () => {
        const { open } = this.props;
        this.setState({ open: open });
    };

    FindTheWay = () => {
        var startLocation = {
            lat: this.state.locationDriver.lat,
            lng: this.state.locationDriver.lng,
        }
        var endLoaction = {
            lat: this.state.lat,
            lng: this.state.lng,
        }
        var arrayLocation = [];
        this.props.doGetArrayLocation(startLocation, endLoaction)
            .then(resJson => {
                console.log('doGetArrayLocation', resJson);
                if (resJson.returnCode !== 0) {
                    resJson.object.steps.map(step => {
                        var polyline = polyUtil.decode(step.polyline.points);
                        polyline.map(latlng => {
                            var location = {
                                lat: latlng[0],
                                lng: latlng[1],
                            }
                            arrayLocation.push(location);
                        })
                    })
                    this.setState({
                        steps: arrayLocation
                    })
                }
            })
            .catch(error => console.log(error));
    }


    componentWillMount() {
        if (this.state.status !== 1 || this.state.status !== 2
            || this.state.status !== 3
            || this.state.status !== 7) {
            socket.emit("get_location_driver", this.state.id);
            socket.on("receive_location_driver", (locationDriver) => {
                this.setState({ locationDriver: locationDriver, 
                    openp: true,
                });
                this.FindTheWay();
            })
        }
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
                            >
                                <Marker
                                    onClick={() => {
                                        alert(1);
                                    }}
                                    name={"customer location"}
                                    position={{ lat: lat, lng: lng }}
                                />
                                <Polyline
                                    path={this.state.steps}
                                    strokeColor="#0000FF"
                                    strokeOpacity={2}
                                    strokeWeight={5} />
                                {this.state.openp ?
                                <Marker
                                    name={"driver location"}
                                    icon={{ url: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png" }}
                                    position={{
                                    lat: this.state.locationDriver.lat,
                                    lng: this.state.locationDriver.lng,
                                }}
                                />
                                : null}
                            </Map>
                        </div>
                    </Card>
                    <div style={{ display: "flex", flexDirection: "row", position: "absolute", bottom: 10, right: 10 }}>
                        <CardContent>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ fontSize: 12, width: 120 }}
                                onClick={this.props._closeDialog}
                            >
                                Trở về
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
        doGetArrayLocation: (startLocation, endLoaction) =>
            dispatch(getArrayLocation(startLocation, endLoaction)),
    };
};
export default GoogleApiWrapper({
    apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})(withStyles(styles)(connect(null, mapDispatchToProps)(ShowRequest)));
