import React from "react";
import { connect } from "react-redux";
import { getUserByToken } from "../../store/actions/user";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { Typography, Button,TextField,Card } from "@material-ui/core";
import { socket } from '../../Utils/Distance.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableTitleSecondary: '',
      tableDriverData: [],
      tableTripData: [],
      N: '',
      name: '',
    };
  }
  ValueChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillMount() {
    socket.emit("get_number_N","true");
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
      socket.on("abc",data=>{
        this.setState({N: data});
      })
  }

  compnentDidMount() {
    
  }

  ChangeClick = () => {
    this.setState({N: this.state.name});
    socket.emit("change_number_n",this.state.N);
  }

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={{ padding: 20,paddingBottom: 0, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Typography style={{ marginRight: 10 }}>
              Số lần tìm tài xế hiện tại cho 1 chuyến đi: {this.state.N}
            </Typography>
          </Card>
          <Card style={{ padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Typography style={{ marginRight: 10 }}>Số lần tìm tài xế cho 1 chuyến đi mới: </Typography>
            <TextField id="address"
            onChange={this.ValueChange("name")}
            />
           
          </Card>

          <Card style={{ padding: 20,paddingBottom: 0, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Button variant="contained" color="primary" style={{marginBottom:13}}
            onClick={() => { this.ChangeClick() }}
          >
            <Typography gutterBottom style={{color: 'white'}}>
              Thay đổi
						</Typography>
          </Button>
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
