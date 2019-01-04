import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";
import { haversineDistance } from "../../Utils/Distance.js";
import polyUtil from 'polyline-encoded';
import Trip from './snackBarTrip.js';
import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import LocationOn from "@material-ui/icons/LocationOn";
import DireactionCar from "@material-ui/icons/DirectionsCar";
import LocalCarWash from "@material-ui/icons/LocalCarWash";
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
import { getLocationDriver, getTripByTripId, getArrayLocation } from '../../store/actions/trip.js';
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
      openCofirm: false,
      openInfoTrip: '',
      user: null,
      address: '',
      errorAdress: '',
      error: 0,
      infoTrip: {},
      message: '',
      Trip: false,
      steps: [],
      action: null,
      BeginEndMessage: 'Bắt đầu chuyến đi',
      BeginEndButton: true,
    };
    this.ExitClick = this.ExitClick.bind(this);
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

  CofirmClick = () => {
    this.setState({ openCofirm: !this.state.openCofirm });
  }

  BeginEndClick = () => {
    if (this.state.BeginEndMessage == 'Bắt đầu chuyến đi') {
      this.setState({
        BeginEndMessage: 'Kết thúc chuyến đi',
        BeginEndButton: false,
      })
      this.BeginTrip();
    }
    else if (this.state.BeginEndMessage == 'Kết thúc chuyến đi') {
      this.setState({
        BeginEndMessage: 'Bắt đầu chuyến đi',
        Trip: false,
      })
      this.EndTrip();
    }
  }

  componentWillMount() {
    if (sessionStorage.getItem('access_token') === null) {
      this.props.history.push('/')
    } else {
      this.props.doGetUserByToken()
        .then(resJson => {
          if (resJson.returnCode === 1) {
            var user = resJson.user;
            this.setState({ user: user });
            var location = {
              lat: this.state.lat,
              lng: this.state.lng,
            };
            user.location = location;
            socket.emit("location_driver", user);
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  AcceptClick = () => {
    if (this.state.action !== null)
      clearTimeout(this.state.action);
    var driver_trip_info = this.state.user;
    driver_trip_info.trip = this.state.infoTrip;
    socket.emit("accept_trip", driver_trip_info);
    this.child.handleClose();
    this.setState({ openInfoTrip: false });
    this.FindTheWay();
  }
  CancleClick = () => {
    this.setState({
      Trip: false,
      infoTrip: {},
      openInfoTrip: false,
      steps: [],
    });
    this.child.handleClose();
  }

  BeginTrip = () => {
    socket.emit("begin_trip", this.state.infoTrip);
  }

  EndTrip = () => {
    this.setState({
      infoTrip: {},
      openInfoTrip: false,
      steps: [],
      Trip: false,
    });
    socket.emit("end_trip", this.state.infoTrip);
  }


  FindTheWay = () => {
    var startLocation = {
      lat: this.state.lat,
      lng: this.state.lng,
    }
    var endLoaction = {
      lat: this.state.infoTrip.tripLatitude,
      lng: this.state.infoTrip.tripLongitude,
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

  componentDidMount() {
    if (!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
    if (this.props.userProfile === null)
      window.location.reload();
    console.log("userprofile: " + this.props.userProfile);
    console.log("socket driver: " + socket.id);
    if (this.props.userProfile !== null)
      socket.emit("update socket", this.props.userProfile);
    socket.on("server_send_request", (data) => {
      console.log("data: " + data.id);
      this.props.doGetTripByTripId(data.id)
        .then(resJson => {
          if (resJson.returnCode === 1) {
            console.log("get info trip");
            this.setState({ openInfoTrip: true, infoTrip: resJson.object })
            this.child.handleClick();
            this.state.action = setTimeout(() => {
              socket.emit("cancel_trip", resJson.object);
              this.child.handleClose();
            }, 5000)
          }
        })
        .catch(error => {
          console.log(error);
        })
    })
    socket.on("message", data => {
      if (data) {
        this.setState({
          message: 'Nhận chuyến đi thành công',
          Trip: true,
          openCofirm: true,
        });
      }
      else {
        this.setState({
          message: 'Chuyến đi này đã có người nhận',
          Trip: false,
          openCofirm: true,
        });
      }
    })
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
        lng: clickEvent.latLng.lng(),
      });
      var user = this.state.user;
      var location = {
        lat: this.state.lat,
        lng: this.state.lng,
      }
      user.location = location;
      socket.emit("location_driver", user);
      console.log("lat: " + location.lat);
      console.log("lng: " + location.lng);
    } else {
      alert("Khoảng cách lớn hơn 100m");
    }
  }
  ExitClick() {
    console.log("exitttttttttttttt");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    this.props.history.push("/");
    socket.emit("log_out", this.state.user);
  };

  OpenClick = () => {
    this.setState({ open: !this.state.open });
  }

  SendLocation = () => {
    var check = this.checkValidation(this.state.address)
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
            console.log("lat: " + location.lat);
            console.log("lng: " + location.lng);
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
              onClick={this.ExitClick}
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

          <Dialog
            open={this.state.openCofirm}
            onClose={() => { this.CofirmClick() }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Thông báo</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {this.state.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.CofirmClick() }} color="primary">
                Xác nhận
            </Button>
            </DialogActions>
          </Dialog>

        </div>

        <div className={classes.Control2}>
          <Button variant="contained" color="primary" className={classes.button2}
          >
            <Typography className={classes.name2} gutterBottom>
              Địa chỉ: {this.state.address === '' ? "Thành phố hồ chính minh" : this.state.address}
            </Typography>
          </Button>
        </div>

        {this.state.Trip ?
          <div className={classes.Control3}>
            {this.state.BeginEndButton ?
              <Button variant="contained" color="primary" className={classes.button3}
                onClick={this.BeginEndClick}
              >
                <Typography className={classes.name} gutterBottom>
                  {this.state.BeginEndMessage}
                </Typography>
                <DireactionCar className={classes.rightIcon} />
              </Button>
              :
              <Button variant="contained" color="primary" className={classes.button3}
                onClick={this.BeginEndClick}
              >
                <Typography className={classes.name} gutterBottom>
                  {this.state.BeginEndMessage}
                </Typography>
                <LocalCarWash className={classes.rightIcon} />
              </Button>
            }

          </div>
          :
          null}


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
            <Polyline
              path={this.state.steps}
              strokeColor="#0000FF"
              strokeOpacity={2}
              strokeWeight={5} />

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
            {this.state.infoTrip ?
              <Marker
                name={"customer location"}
                icon={{ url: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png" }}
                position={{
                  lat: this.state.infoTrip.tripLatitude,
                  lng: this.state.infoTrip.tripLongitude,
                }}
              />
              : null}

          </Map>
        </div>
        <Trip open={this.state.openInfoTrip}
          name={this.state.infoTrip.customerName}
          phone={this.state.infoTrip.customerPhone}
          address={this.state.infoTrip.customerAddress}
          note={this.state.infoTrip.note}
          onRef={ref => (this.child = ref)}
          AcceptClick={this.AcceptClick}
          CancleClick={this.CancleClick}
        />
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
  Control3: {
    marginTop: 130,
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
    width: 40,
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

  button3: {
    paddingLeft: 3,
    color: 'white',
    float: "left",
    marginTop: 10,
    marginRight: 10,
    width: 40,
    [theme.breakpoints.up('md')]: {
      width: 205,
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

const mapStateToProps = state => {
  return {
    userProfile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetUserByToken: () => dispatch(getUserByToken()),
    doGetLocationDriver: (address) => dispatch(getLocationDriver(address)),
    doGetTripByTripId: (id) => dispatch(getTripByTripId(id)),
    doGetArrayLocation: (startLocation, endLoaction) =>
      dispatch(getArrayLocation(startLocation, endLoaction)),
  };
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyBWvtNFhg1yB1_q8i8F0aEFdGrSh4O1rPQ"
})(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Driver)));
