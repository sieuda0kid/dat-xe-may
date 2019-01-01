import React, { Component } from "react";
import CheckRequest from "./CheckRequest.js";
import { connect } from "react-redux";
import Table from "../../components/Table/Table.jsx";
import { socket } from './../../Utils/Distance.js';
import { getTripNonLocation } from "../../store/actions/trip";
import { getUserByToken } from '../../store/actions/user.js';
import io from 'socket.io-client';
const skt = io('http://localhost:8888')
const tableHead = [
  { id: "id", label: "Mã chuyến đi" },
  { id: "customerName", label: "Tên khách" },
  { id: "customerAddress", label: "Địa chỉ đón khách " },
  { id: "requestTime", label: "Thời gian", type: "time" },
  { id: "note", label: "Ghi chú" },
  { id: "driverName", label: "Tài xế" },
  { id: "statusName", label: "Tình trạng" }
];
class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableTitle: "",
      tableTitleSecondary: "",
      tableData: [],
      open: false,
      load: false,
      infoTrip: {},
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
          if (user.userType == 1)
            this.props.history.push("/dashboard/receiverequest");
        }
      })
  }

  loadDataTable = () => {
    this.props
        .DogetTripNonLocation()
        .then(resJson => {
          this.setState({
            tableData: resJson.object
          });
        })
        .catch(error => {
          console.log("get trip error");
        });
  }

  componentDidMount() {
    if (this.state.userType != 1) {
      skt.on("server_send_trip", (data) => {
        this.loadDataTable();
      })
      this.loadDataTable();
    }
  }
  _closeDialog = () => {
    this.setState({
      open: false,
    })
  }

  confirm = () => {
    this.setState({load: true});
    this.loadDataTable();
  }

  render() {
    const { open, infoTrip } = this.state;
    return (
      <div>
        <Table
          tableTitle={"DANH SÁCH CHUYẾN ĐI"}
          tableTitleSecondary={this.state.tableTitleSecondary}
          tableHead={tableHead}
          tableData={this.state.tableData}
          onTableRowClick={data => {
            this.setState({
              infoTrip: data
            }, () => {
              this.setState({
                open: !open,
                load: false,
              })
            })
          }}
        />
        {this.state.open ?
          <CheckRequest
            open={open}
            infoTrip={infoTrip}
            _closeDialog={this._closeDialog}
            _confirm={this.confirm}
          /> : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.user.userProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    DogetTripNonLocation: () => dispatch(getTripNonLocation()),
    doGetUserByToken: () => dispatch(getUserByToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Request);
