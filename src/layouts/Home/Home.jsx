import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import HomeHeader from './../../components/Home/HomeHeader.jsx';
import HomeView from './../../views/Home/Home';
import AdminView from './../../views/Admin/admin'
import CustomerView from './../../views/Customer/customer';
import DriverView from './../../views/Driver/driver';
import PersonnelView from './../../views/Personnel/personnel';
import withStyles from "@material-ui/core/styles/withStyles";

const switchRouter = (
	<Switch>
		<Route path="/home" component={HomeView} />
		<Route path="/admin" component={AdminView} />
		<Route path="/customer" component={CustomerView} />
		<Route path="/driver" component={DriverView} />
		<Route path="/personnel" component={PersonnelView} />
		<Redirect from="/" to="/home" />
	</Switch>
);

class Home extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.wrapper}>
				<HomeHeader />
				<div className={classes.content}>
					{switchRouter}
				</div>
			</div>
		)
	}
}
const styles  ={
	wrapper: {
		width: '95%',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	content: {
		padding: "30px 0px",
		minHeight: "calc(100vh - 123px)",
		marginTop: 30,
	},
};
export default withStyles(styles)(Home);