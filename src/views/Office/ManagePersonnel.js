import React from "react";
import Table from "../../components/Table/Table.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
// import Button from "components/CustomButtons/Button.jsx";
import UserProfile from "../../components/UserProfile/UserProfile";
import { getUserForType } from "../../store/actions/user";
import { connect } from "react-redux";


const tableHead = [
  { id: 'id', label: 'Mã nhân viên' },
  { id: 'fullname', label: 'Tên nhân viên' },
];

class ManageStaff extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitleSecondary: '',
      tableData: [],
      userInfo: null,
    };
  }

  componentDidMount(){
    this.props.doGetUserForType(1)
    .then(resJson => {
      console.log('resJson', resJson);
      this.setState({
        tableData: resJson.object,
        userInfo: resJson.object[0]
      })
    })
    .catch(error =>{
      console.log('doGetUserForType error', error);
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
            tableTitle={'DANH SÁCH NHÂN VIÊN'}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableHead}
            tableData={this.state.tableData}
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
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doGetUserForType: (dif) => dispatch(getUserForType(dif))
  };
};

export default connect(null, mapDispatchToProps)(ManageStaff);
