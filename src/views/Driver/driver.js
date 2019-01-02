import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { haversineDistance } from "../../Utils/Distance.js";

import Trip from './snackBarTrip.js';
import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import LocationOn from "@material-ui/icons/LocationOn";
import Exit from "@material-ui/icons/ExitToApp";
import { Typography, Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { getUserByToken } from '../../store/actions/user.js';
import { getLocationDriver } from '../../store/actions/trip.js';
import { connect } from 'react-redux';
import { socket } from '../../Utils/Distance.js';
class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 10.823099,
      lng: 106.629664,
      invisible: false,
      open: false,
      user: null,
      address: '',
      errorAdress: '',
      error: 0,
    };
  }

  checkValidation = (address) => {
    var error = 0;
    if (address === '') {
      this.setState({ errorAdress: 'Địa chỉ không được để trống' })
      error++;
    }
    this.setState({ error: error });
    if (error > 0)
      return false;
    return true;
  }

  ValueChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillMount() {
    if (sessionStorage.getItem('access_token') === null) {
      this.props.history.push('/')
    } else {
      this.props.doGetUserByToken()
        .then(resJson => {
          if (resJson !== undefined) {
            var user = resJson.user;
            this.setState({ user: user });
          }
        })
    }
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
    console.log("exitttttttttttttt");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    this.props.history.push("/");
    socket.emit("driver_offline", this.state.user);
  };

  OpenClick = () => {
    this.setState({ open: !this.state.open });
  }

  SendLocation = () => {
    var check = this.checkValidation(this.state.address)
    console.log("checl:" + check);
    if (check) {
      this.props.doGetLocationDriver(this.state.address)
        .then(resJson => {
          if (resJson.returnCode == 1) {
            var location = resJson.object;
            this.setState({
              lat: location.lat,
              lng: location.lng,
              open: false,
            });
            var user = this.state.user;
            user.location = location;
            socket.emit("location_driver", user);
          }
          else {
            this.setState({
              lat: 10.823099,
              lng: 106.629664,
              open: false,
              address: "Thành phố Hồ Chí Minh",
            })
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  handleBadgeVisibility = () => {
    this.setState(prevState => ({ invisible: !prevState.invisible }));
    if (this.state.invisible)
      socket.emit("driver_online", this.state.user);
    else
      socket.emit("driver_offline", this.state.user);
  };
  render() {
    const { lat, lng, invisible } = this.state;
    const { classes } = this.props;
    return (
      <div style={{ marginLeft: -8 }}>
        <div className={classes.Control}>
          <Button variant="contained" color="primary" className={classes.button}
            onClick={() => { this.OpenClick() }}
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
              style={{ paddingLeft: 3 }}
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
              onClick={() => { this.ExitClick() }}
            >
              Đăng xuất
						</Typography>
            <Exit className={classes.rightIcon} style={{ paddingBottom: 2 }} />
          </Button>



          <Dialog
            open={this.state.open}
            onClose={() => { this.OpenClick() }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Nhập địa chỉ</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Nhập địa chỉ để định vị, vị trí trên bản đồ
            </DialogContentText>
              <TextField
                autoFocus
                error={this.state.error !== 0 && this.state.errorAdress !== ''}
                margin="dense"
                id="address"
                label="Địa chỉ"
                type="address"
                fullWidth
                onChange={this.ValueChange("address")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.OpenClick() }} color="primary">
                Hủy
            </Button>
              <Button onClick={() => { this.SendLocation() }} color="primary">
                Hoàn tất
            </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className={classes.Control2}>
          <Button variant="contained" color="primary" className={classes.button2}
            onClick={() => { this.OpenClick() }}
          >
            <Typography className={classes.name2} gutterBottom>
              Địa chỉ: {this.state.address === '' ? "Thành phố hồ chính minh" : this.state.address}
            </Typography>
          </Button>
        </div>

        <div style={{ flex: 1, zIndex: 2 }}>
          <Map
            google={this.props.google}
            zoom={14}
            center={{
              lat: lat,
              lng: lng,
            }}
            gestureHandling={"cooperative"}
            onClick={this.mapClicked.bind(this)}
          >
            <Marker
              onClick={() => {
                alert(1);
              }}
              name={"Current location"}
              position={{
                lat: lat,
                lng: lng,
              }}
            />
          </Map>
        </div>
        <Trip open={false} />
      </div>
    );
  }
}

const styles = theme => ({
  Control: {
    marginLeft: 10,
    position: 'fixed',
    zIndex: 1,
  },
  Control2: {
    marginTop: 65,
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

  button2: {
    wordBreak: "break-all",
    paddingLeft: 3,
    color: 'white',
    float: "left",
    marginTop: 10,
    marginRight: 10,
    width: 286,
    minHeight: 48,
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

  name2: {
    color: 'white',
    fontFamily: 'roboto medium',
    fontSize: 15,
    marginTop: 6,
    display: 'initial',
  },


  clabel: {
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
const mapDispatchToProps = dispatch => {
  return {
    doGetUserByToken: () => dispatch(getUserByToken()),
    doGetLocationDriver: (address) => dispatch(getLocationDriver(address)),
  };
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})(withStyles(styles)(connect(null, mapDispatchToProps)(Driver)));
