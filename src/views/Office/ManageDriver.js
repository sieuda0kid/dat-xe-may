import React from "react";
import Table from "../../components/Table/Table.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import UserProfile from "../../components/UserProfile/UserProfile";
import { connect } from "react-redux";
import { getUserForType, getUserByToken } from "../../store/actions/user";
import { getTripByDriverId } from "../../store/actions/trip";

const tableDriverHead = [
  { id: 'id', label: 'Mã tài xế' },
  { id: 'fullname', label: 'Tên tài xế' },
  { id: 'statusName', label: 'Tình trạng tài xế' },
];

const tableTripHead = [
  { id: 'tripId', label: 'Mã chuyến đi' },
  { id: 'cusomterName', label: 'Tên khách hàng' },
  { id: 'address', label: 'Địa chỉ đón khách' },
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
      userInfo: null,
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

  componentDidMount() {
    if (this.state.userType === 3) {
      this.props.doGetUserForType(0)
        .then(resJson => {
          console.log('resJson', resJson);
          this.setState({
            tableDriverData: resJson.object,
            userInfo: resJson.object[0]
          })
          this.getTripByDriverId(resJson.object[0].id);
        })
        .catch(error => {
          console.log('doGetUserForType error', error);
        })
    }
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
      userInfo: item
    })
  }

  render() {
    // const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Table
            tableTitle={'DANH SÁCH TÀI XẾ'}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableDriverHead}
            tableData={this.state.tableDriverData}
            onTableRowClick={this.onTableRowClick}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          {this.state.userInfo != null
            ?
            <UserProfile userInfo={this.state.userInfo} />
            :
            null}
        </GridItem>
        <GridItem xs={12} sm={12} md={12} >
          <Table
            tableTitle={'DANH SÁCH CHUYẾN ĐI'}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableTripHead}
            tableData={this.state.tableTripData}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doGetUserForType: (dif) => dispatch(getUserForType(dif)),
    doGetTripByDriverId: (driverId) => dispatch(getTripByDriverId(driverId)),
    doGetUserByToken: () => dispatch(getUserByToken()),
  };
};

export default connect(null, mapDispatchToProps)(ManageDriver);
