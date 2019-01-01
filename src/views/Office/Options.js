import React from "react";
import { connect } from "react-redux";
import { getUserByToken } from "../../store/actions/user";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Typography, TextField, Card } from "@material-ui/core";

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitleSecondary: '',
      tableDriverData: [],
      tableTripData: [],
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

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={{ padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Typography style={{ marginRight: 10 }}>Số lần tìm tài xế cho 1 chuyến đi: </Typography>
            <TextField />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doGetUserByToken: () => dispatch(getUserByToken()),
  };
};

export default connect(null, mapDispatchToProps)(Settings);
