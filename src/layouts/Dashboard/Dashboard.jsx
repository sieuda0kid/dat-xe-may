import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserByToken } from '../../store/actions/user.js';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import dashboardRoutes from "../../routes/dashboard.jsx";
import RouterReceive from "../../routes/RouterReceive.jsx"
import RouterLocation from "../../routes/RouterLocation.jsx";
import dashboardStyle from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from '../../assets/images/sidebar-2.jpg'
import logo from "../../assets/images/logo.png";
const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route exact path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
    if (sessionStorage.getItem('access_token') === null){
      this.props.history.push('/')
    }else{ 
      this.props.doGetUserByToken()
      .then(resJson => {
        console.log("doGetUserByToken", resJson);
        if (resJson !== undefined){
          var user = resJson.user;
          this.setState({userType: user.userType});
          if(user.userType == 1)
            this.props.history.push("/dashboard/receiverequest");
          else if(user.userType == 2)
            this.props.history.push("/dashboard/locaterequest");
        }
      })
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper} style={{backgroundColor: '#EFEFEF'}}>
        <Sidebar
          routes={this.state.userType == 3 ? dashboardRoutes : (this.state.userType == 2 ? RouterLocation : RouterReceive)}
          logoText={"Tesla"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    doGetUserByToken: () => dispatch(getUserByToken()),
  };
};
export default withStyles(dashboardStyle)(connect(null, mapDispatchToProps)(Dashboard));
