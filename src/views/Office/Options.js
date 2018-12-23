import React from "react";
// import Table from "components/Table/Table.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Typography, TextField, Card } from "@material-ui/core";

// const tableUserTypeHead = [
//   { id: 'id', label: 'Mã loại người dùng' },
//   { id: 'typeName', label: 'Tên loại người dùng' },
// ];

// const tableDriverStatusHead = [
//   { id: 'id', label: 'Mã tình trạng' },
//   { id: 'statusName', label: 'Tên tình trạng' },
// ];

// const tableTripStatusHead = [
//   { id: 'id', label: 'Mã tình trạng' },
//   { id: 'statusName', label: 'Tên tình trạng' },
// ];

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitleSecondary: '',
      tableDriverData: [],
      tableTripData: [],
    };
  }

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={{ padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Typography style={{marginRight: 10}}>Số lần tìm tài xế cho 1 chuyến đi: </Typography>
            <TextField />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default Settings;
