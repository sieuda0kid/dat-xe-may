import React from "react";
import Table from "../../components/Table/Table.jsx";
import { connect } from "react-redux";
import { getAllTrip } from "../../store/actions/trip";
import { getUserByToken } from '../../store/actions/user.js';
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
    };

    socket.on('server_send_trip', (data) => this.onReciveData(data));
  }

  componentWillMount(){
    this.props.doGetUserByToken()
      .then(resJson => {
        console.log("doGetUserByToken", resJson);
        if (resJson !== undefined){
          var user = resJson.user;
          this.setState({userType: user.userType});
          if(user.userType == 2)
            this.props.history.push("/dashboard/locaterequest");
          else if(user.userType == 1)
            this.props.history.push("/dashboard/receiverequest");
        }
      })
  }

  componentDidMount(){
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

  onReciveData = (data) => {
    console.log("data from socket key server_send_trip", data);
  }

  render() {
    // const { classes } = this.props;
    return (
      <Table
        tableTitle={'DANH SÁCH CHUYẾN ĐI'}
        tableTitleSecondary={this.state.tableTitleSecondary}
        tableHead={tableHead}
        tableData={this.state.tableData}
        sls = "2"
      />
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