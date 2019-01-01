import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import LocationOn from "@material-ui/icons/LocationOn";
import Exit from "@material-ui/icons/ExitToApp";
import { haversineDistance } from "../../Utils/Distance.js";
import { Typography, Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoTripModal from "./InfoTripModal";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 10.7629123,
      lng: 106.6734333,
      invisible: false,
      open: false,
    };
  }

  componentWillMount() {
    // if (sessionStorage.getItem('access_token') === null){
    //   this.props.history.push('/')
    // }
  }

  mapClicked(mapProps, map, clickEvent) {
    const { lat, lng } = this.state;
    const distanceAllow = haversineDistance(
      [lat, lng],
      [clickEvent.latLng.lat(), clickEvent.latLng.lng()],
      false
    );
    if (distanceAllow) {
      this.setState({
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng()
      });
    } else {
      alert("Khoảng cách lớn hơn 100m");
    }
  }
  ExitClick = () => {
    sessionStorage.removeItem("access_token");
    this.props.history.push("/");
  };

  OpenClick = () => {
    this.setState({open: !this.state.open});
  }

  handleBadgeVisibility = () => {
    this.setState(prevState => ({ invisible: !prevState.invisible }));
  };
  render() {
    const { lat, lng, invisible } = this.state;
    const { classes } = this.props;
    return (
      <div style={{ marginLeft: -8 }}>
        <div className={classes.Control}>
          <Button variant="contained" color="primary" className={classes.button}
          onClick={()=>{this.OpenClick()}}
          >
            <Typography className={classes.name} gutterBottom>
              Định vị
						</Typography>
            <LocationOn className={classes.rightIcon} />
          </Button>
          <FormGroup row className={classes.label}>
            <FormControlLabel
              control={
                <Switch color="primary" checked={!invisible} onChange={this.handleBadgeVisibility} />
              }
              label="Online / OffLine"
              style={{paddingLeft: 3}}
            />
          </FormGroup>
          <FormGroup row className={classes.clabel}>
            <FormControlLabel
              control={
                <Switch color="primary" checked={!invisible} onChange={this.handleBadgeVisibility} />
              }
              label=""
            />
          </FormGroup>
          <Button variant="contained" color="primary" className={classes.button}>
            <Typography className={classes.name} gutterBottom
            onClick={()=>{this.ExitClick()}}
            >
              Đăng xuất
						</Typography>
            <Exit className={classes.rightIcon} style={{paddingBottom: 2}} />
          </Button>

          <Dialog
          open={this.state.open}
          onClose={()=>{this.OpenClick()}}
          aria-labelledby="form-dialog-title"
          >
          <DialogTitle id="form-dialog-title">Nhập địa chỉ</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nhập địa chỉ để định vị, vị trí trên bản đồ
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="address"
              label="Địa chỉ"
              type="address"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.OpenClick()}} color="primary">
              Hủy
            </Button>
            <Button onClick={() => {this.OpenClick()}} color="primary">
              Hoàn tất
            </Button>
          </DialogActions>
        </Dialog>

        </div>

        <div style={{ flex: 1, zIndex: 2 }}>
          <Map
            google={this.props.google}
            style={{
              flex: 1,
              paddingBottom: 50
            }}
            zoom={14}
            initialCenter={{
              lat: lat,
              lng: lng
            }}
            gestureHandling={"cooperative"}
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
        {/* <InfoTripModal/> */}
      </div>
    );
  }
}

Driver.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  Control: {
    marginLeft: 10,
    position: 'fixed',
    zIndex: 1,
  },
  button: {
    paddingLeft: 3,
    color: 'white',
    float: "left",
    marginTop: 10,
    marginRight: 10,
    width: 50,
    [theme.breakpoints.up('md')]: {
      width: 160,
    },
  },
  rightIcon: {
    paddingLeft: 10,
  },
  label: {
    background: 'powderblue',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
    , "boxShadow": "2px 2px 2px #666",
    width: 170, float: 'left',
    marginRight: 10,
    height: 48,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'initial',
    },
  },
  name: {
    color: 'white',
    fontFamily: 'roboto medium',
    fontSize: 15,
    marginTop: 6,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'initial',
    },
  },

  clabel:{
    background: 'powderblue',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 3,
    paddingLeft: 15,
    borderRadius: 5,
    boxShadow: "2px 2px 2px #666",
    width: 50, float: 'left',
    marginRight: 10,
    height: 39,
    display: 'initial',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});

export default GoogleApiWrapper({
  apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})(withStyles(styles)(Driver));
