import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import { TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { addCustomerAndTrip } from "../../store/actions/trip";
import AlertDialog from "../../components/Dialog/AlertDialog";
import withStyles from "@material-ui/core/styles/withStyles";


class ReceiveRequestView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      address: '',
      note: '',

      nameErrorMessage: '',
      phoneErrorMessage: '',
      addressErrorMessage: '',

      errorCount: 0,

      isDialogOpen: false,
      dialogAlert: '',
    };
  }

  checkValidation = (name, phone, address, note) => {
    var errorCount = 0;
    if (name === ''){
      this.setState({
        nameErrorMessage: 'Họ tên không được để trống'
      })
      errorCount++;
    } else {
      this.setState({
        nameErrorMessage: ''
      })
    }

    if (phone === ''){
      this.setState({
        phoneErrorMessage: 'Số điện thoại không được để trống'
      })
      errorCount++;
    } else {
      this.setState({
        phoneErrorMessage: ''
      })
    }

    if (address === ''){
      this.setState({
        addressErrorMessage: 'Địa chỉ không được để trống'
      })
      errorCount++;
    } else {
      this.setState({
        addressErrorMessage: ''
      })
    }

    this.setState({
      errorCount: errorCount
    })
    if (errorCount === 0){
      return true;
    }
    return false;
  }

  handleChange = name => event => {
    this.setState({
      [name]: name === 'phone' ? event.target.value.replace(/[^0-9]/g, '') : event.target.value,
    });
  };

  onReceiveClick = () => {
    var check = this.checkValidation(this.state.name, this.state.phone, this.state.address, this.state.note);
    if (check){
      var customerInfo = {
        customerName: this.state.name,
        customerAddress: this.state.address,
        customerPhone: this.state.phone,
      }
      this.props.doAddCustomerAndTrip(customerInfo, this.state.note)
      .then(resJson => {
        this.setState({
          dialogAlert: resJson.message,
          isDialogOpen: true
        })
      })
      .catch(error => {

      })
      this.setState({
        name: '',
        phone: '',
        address: '',
        note: '',
      })
    }
  }

  handleClose = () => {
    this.setState({
      isDialogOpen: false
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <AlertDialog open={this.state.isDialogOpen} title="Thông báo" content={this.state.dialogAlert}  onClose={this.handleClose}/>
        <GridItem xs={0} sm={0} md={2} />
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h2 className={classes.cardTitleWhite}>THÔNG TIN CHUYẾN ĐI</h2>
            </CardHeader>
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }} className={classes.textField}>
                    <TextField
                      error={this.state.errorCount !== 0 && this.state.nameErrorMessage !== ''}
                      id="standard-name"
                      label="Họ tên *"
                      className={classes.textField}
                      style={{ marginRight: 10 }}
                      value={this.state.name}
                      onChange={this.handleChange('name')}
                      margin="normal"
                    />
                    <Typography style={{ color: 'red', fontFamily: 'Roboto-Light', fontSize: 12 }}>{this.state.nameErrorMessage}</Typography>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }} className={classes.textField}>
                    <TextField
                      error={this.state.errorCount !== 0 && this.state.phoneErrorMessage !== ''}
                      id="standard-name"
                      label="Số điện thoại *"
                      className={classes.textField}
                      style={{ marginLeft: 10 }}
                      value={this.state.phone}
                      onChange={this.handleChange('phone')}
                      margin="normal"
                    />
                    <Typography style={{ color: 'red', fontFamily: 'Roboto-Light', fontSize: 12 }}>{this.state.phoneErrorMessage}</Typography>
                  </div>
                </div>
                <TextField
                  error={this.state.errorCount !== 0 && this.state.addressErrorMessage !== ''}
                  id="standard-name"
                  label="Địa chỉ đón khách *"
                  className={classes.textField}
                  value={this.state.address}
                  onChange={this.handleChange('address')}
                  margin="normal"
                />
                <Typography style={{ color: 'red', fontFamily: 'Roboto-Light', fontSize: 12 }}>{this.state.addressErrorMessage}</Typography>
                <TextField
                  id="standard-name"
                  label="Ghi chú"
                  className={classes.textField}
                  value={this.state.note}
                  onChange={this.handleChange('note')}
                  margin="normal"
                  multiline
                  rows="6"
                />
                <Button round variant="contained" color="primary" style={{ width: 100, marginLeft: 'auto' }} onClick={this.onReceiveClick}>
                  <Typography style={{ color: '#FFFFFF' }}>Nhận</Typography>
                </Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={0} sm={0} md={2} />
      </GridContainer>
    );
  }
}

const styles = {
  textField: {
    width: '100%',
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


const mapDispatchToProps = dispatch => {
  return {
    doAddCustomerAndTrip: (customerInfo, note) => dispatch(addCustomerAndTrip(customerInfo, note))
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(ReceiveRequestView));
