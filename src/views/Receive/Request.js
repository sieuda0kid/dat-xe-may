import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import { TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { addCustomerAndTrip } from "../../store/actions/trip";
import { getUserByToken } from '../../store/actions/user.js';
import AlertDialog from "../../components/Dialog/AlertDialog";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "../../components/Table/Table.jsx";
import {getCustomer} from "../../store/actions/user.js";
const tableHead = [
  { id: 'id', label: 'Mã khách' },
  { id: 'customerName', label: 'Tên khách' },
  { id: 'customerAddress', label: 'Địa chỉ' },
  { id: 'customerPhone', label: 'Diện thoại' },
];

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

      history: false,
      tableData: [],
      message: 'Xem lịch sử',
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

  loadData = () => {
    this.props.doGetCustomer()
      .then(resJson => {
        this.setState({
          tableData: resJson.object,
        })
      })
      .catch(error => {
        console.log('Get customer error: ', error);
      })
  }

  onTableRowClick = () => {

  }

  componentWillMount(){
    this.loadData();
    this.props.doGetUserByToken()
      .then(resJson => {
        console.log("doGetUserByToken", resJson);
        if (resJson !== undefined){
          var user = resJson.user;
          if(user.userType == 2)
            this.props.history.push("/dashboard/locaterequest");
        }
      })
  }

  HistoryClick = () =>{
    this.setState({history: !this.state.history,
      
    });
    if(this.state.message === "Xem lịch sử")
      this.setState({message: "Ẩn lịch sử"})
    else
    this.setState({message: "Xóa lịch sử"})
    console.log("history: "+this.state.history);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={0}>
        <AlertDialog open={this.state.isDialogOpen} title="Thông báo" content={this.state.dialogAlert}  onClose={this.handleClose}/>
        <Grid item xs={false} sm={false} md={2} >
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary" bg="#483D8B" styles="15" mar="0">
              <h2 className={classes.cardTitleWhite}>THÔNG TIN CHUYẾN ĐI</h2>
            </CardHeader>
            <CardBody style={{background: "#63cdd7"}}>
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
                      label="SĐT *"
                      className={classes.textField}
                      style={{ marginLeft: 10, width: '94%'}}
                      value={this.state.phone}
                      onChange={this.handleChange('phone')}
                      margin="normal"
                      inputProps={{
                        maxLength: 10
                      }}
                    />
                    <Typography style={{ color: 'red', fontFamily: 'Roboto-Light', fontSize: 12 }}>{this.state.phoneErrorMessage}</Typography>
                  </div>
                </div>
                <TextField
                  error={this.state.errorCount !== 0 && this.state.addressErrorMessage !== ''}
                  id="standard-name"
                  label="Địa chỉ *"
                  style={{width: '98%'}}
                  className={classes.textField}
                  value={this.state.address}
                  onChange={this.handleChange('address')}
                  margin="normal"
                />
                <Typography style={{ color: 'red', fontFamily: 'Roboto-Light', fontSize: 12 }}>{this.state.addressErrorMessage}</Typography>
                <TextField
                  id="standard-name"
                  label="Ghi chú *"
                  style={{width: '98%'}}
                  className={classes.textField}
                  value={this.state.note}
                  onChange={this.handleChange('note')}
                  margin="normal"
                  multiline
                  rows="6"
                />
                <Button round variant="contained" color="primary" style={{marginRight:15, width: 100, marginLeft: 'auto', background: "#483D8B" }} 
                onClick={this.onReceiveClick}>
                  <Typography style={{ color: '#FFFFFF' }}>Nhận</Typography>
                </Button>

                <Button round variant="contained" color="primary" style={{ width: 100, marginLeft: 'auto', background: "#483D8B",marginRight: 15 }} 
                onClick={() => {this.HistoryClick()}}>
                  <Typography style={{ color: '#FFFFFF' }}>{this.state.message}</Typography>
                </Button>
              </div>
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={false} sm={false} md={2} >
        </Grid>
        {this.state.history? 
        <Grid item xs={12} sm={12} md={12}>
          <Table
            tableTitle={'LỊCH SỬ KHÁCH HÀNG GỌI'}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableHead}
            tableData={this.state.tableData}
            onTableRowClick={this.onTableRowClick}
          />
        </Grid>
        :
        null
        }
        
      </Grid>
    );
  }
}

const styles = {
  textField: {
    width: '100%',
    color: "White",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'roboto bold', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


const mapDispatchToProps = dispatch => {
  return {
    doAddCustomerAndTrip: (customerInfo, note) => dispatch(addCustomerAndTrip(customerInfo, note)),
    doGetUserByToken: () => dispatch(getUserByToken()),
    doGetCustomer: () => dispatch(getCustomer()),
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(ReceiveRequestView));
