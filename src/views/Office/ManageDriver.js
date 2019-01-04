import React from "react";
import Table from "../../components/Table/Table.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { connect } from "react-redux";
import { getUserForType, getUserByToken } from "../../store/actions/user";
import { getInfoTrip } from "../../store/actions/trip.js";
import { socket } from "../../Utils/Distance.js";

const tableDriverHead = [
  { id: 'id', label: 'Mã tài xế' },
  { id: 'fullname', label: 'Tên tài xế' },
  { id: 'statusName', label: 'Tình trạng tài xế' },
];

const tableTripHead = [
  { id: 'id', label: 'Mã chuyến đi' },
  { id: 'customerName', label: 'Tên khách hàng' },
  { id: 'customerAddress', label: 'Địa chỉ đón khách' },
  { id: 'statusName', label: 'Tình trạng chuyến đi' },
];


class ManageDriver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitleSecondary: '',
      tableDriverData: [],
      tableTripData: [],
      userType: '',
    };
  }

  componentWillMount() {
    this.props.doGetUserByToken()
      .then(resJson => {
        console.log("doGetUserByToken", resJson);
        if (resJson !== undefined) {
          var user = resJson.user;
          this.setState({ userType: user.userType });
          if (user.userType == 2)
            this.props.history.push("/dashboard/locaterequest");
          else if (user.userType == 1)
            this.props.history.push("/dashboard/receiverequest");
        }
      })
  }

  loadData_driver = () => {
    this.props.doGetUserForType(0)
      .then(resJson => {
        this.setState({
          tableDriverData: resJson.object,
        })
      })
      .catch(error => {
        console.log('Get User For Type error: ', error);
      })
  }
  loadData_Trip = () =>{
    this.props.doGetInfoTrip()
    .then(res =>{
      console.log("obecjt trip: "+res.object.status);
      this.setState({
        tableTripData: res.object,
      })
    })
    .catch(error =>{
      console.log('get info trip error: ', error);
    })
  }
  componentDidMount() {
    this.loadData_driver();
    this.loadData_Trip();
    socket.on("server_send_trip",(data)=>{
      this.loadData_Trip();
    })
    socket.on("update_status_driver",(data)=>{
      this.loadData_driver();
    })
  }

  getTripByDriverId = (driverId) => {
    this.props.doGetTripByDriverId(driverId)
      .then(resJson => {

      })
      .catch(error => {
        console.log(error);
      })
  }

  onTableRowClick = (item) => {
    this.setState({
      ex: item
    })
  }

  render() {
    // const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Table
            tableTitle={'DANH SÁCH TÀI XẾ'}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableDriverHead}
            tableData={this.state.tableDriverData}
            onTableRowClick={this.onTableRowClick}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} >
          <Table
            tableTitle={'DANH SÁCH CHUYẾN ĐI'}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableTripHead}
            tableData={this.state.tableTripData}
            onTableRowClick={this.onTableRowClick}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doGetUserForType: (dif) => dispatch(getUserForType(dif)),
    doGetInfoTrip: () => dispatch(getInfoTrip()),
    doGetUserByToken: () => dispatch(getUserByToken()),
  };
};

export default connect(null, mapDispatchToProps)(ManageDriver);
