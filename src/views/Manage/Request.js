import React from "react";
import Table from "../../components/Table/Table.jsx";
import { connect } from "react-redux";
import { getAllTrip } from "../../store/actions/trip";
import { getUserByToken } from '../../store/actions/user.js';
import ShowRequest from './ShowRequest.js';
import io from 'socket.io-client';
const socket = io('http://localhost:8888')

const tableHead = [
  { id: 'id', label: 'Mã chuyến đi' },
  { id: 'customerName', label: 'Tên khách' },
  { id: 'customerAddress', label: 'Địa chỉ đón khách ' },
  { id: 'requestTime', label: 'Thời gian', type: 'time' },
  { id: 'note', label: 'Ghi chú' },
  { id: 'driverName', label: 'Tài xế' },
  { id: 'statusName', label: 'Tình trạng' },
];

class ManageRequestView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitle: '',
      tableTitleSecondary: '',
      tableData: [],
      open: false,
      load: false,
      infoTrip: {},
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

  loadData = () => {
    this.props.doGetAllTrip()
      .then(resJson => {
        this.setState({
          tableData: resJson.object
        })
      })
      .catch(error => {
        console.log('get all trip error');
      })
  }
  componentDidMount() {
    this.loadData();
    socket.on("update_status_trip", data => {
      this.loadData();
    })
    socket.on("server_send_trip", data => {
      this.loadData();
    })
  }

  _closeDialog = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const { open, infoTrip } = this.state;
    return (
      <div>
        <Table
          tableTitle={'DANH SÁCH CHUYẾN ĐI'}
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
          sls="2"
        />
        {this.state.open ?
          <ShowRequest
            open={open}
            infoTrip={infoTrip}
            _closeDialog={this._closeDialog}
          /> : null
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doGetAllTrip: () => dispatch(getAllTrip()),
    doGetUserByToken: () => dispatch(getUserByToken()),
  };
};

export default connect(null, mapDispatchToProps)(ManageRequestView);