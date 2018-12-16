import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Typography, NativeSelect, Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import TopHomeView from './../../assets/images/TopHomeView.png';
import av1 from './../../assets/images/av1.png';
import av2 from './../../assets/images/av2.png';
import av3 from './../../assets/images/av3.png';
import { login } from '../../store/actions/user';
import { connect } from 'react-redux';
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			type: '1',
		};
	}

	componentWillMount() {

	}

	onValueChange = (event) => {
		if (event.target.id === "txtUsername") {
			this.setState({
				username: event.target.value
			})
		}
		else if (event.target.id === "txtPassword")
			this.setState({
				password: event.target.value
			})
		else if (event.target.id === "txtType") {
			this.setState({
				type: event.target.value
			})
		}
	}

	onLoginClick = (username, password, type) => {
		this.props.doLogin(username, password, type).then((resJson) => {
			if (resJson.returnCode === 1) {
				if (resJson.user.type === "1")
					this.props.history.push('/personnel');
				else if (resJson.user.type === "2")
					this.props.history.push('/driver');
				else if (resJson.user.type === "3")
					this.props.history.push('/admin');
			}

		}).catch((error) => {
			console.log(error);
		});
	}



	componentDidMount() {
		if (localStorage.getItem('access_token') !== null)
			this.props.history.push('/personnel')
	}

	render() {
		const { classes } = this.props
		return (
			<Grid container space={12}>
				<Grid item xs={12} sm={12} md={12} className={classes.root}>
					<img src={TopHomeView} alt="TopHomeView" className={classes.img} />
					<div className={classes.formlogin}>
						<Typography className={classes.label} variant="h4" gutterBottom>
							Đăng nhập
						</Typography>
						<Typography className={classes.label2}>
							Tài khoản
						</Typography>
						<input type="text" id="txtUsername" name="txtUsername" placeholder="Nhập tên tài khoản" className={classes.input}
							onChange={this.onValueChange}
						/>
						<Typography className={classes.label2}>
							Mất khẩu
						</Typography>
						<input type="password" id="txtPassword" name="txtPassword" placeholder="Nhập mất khẩu" className={classes.input}
							onChange={this.onValueChange}
						/>
						<Typography className={classes.label2}>
							Loại tài khoản
						</Typography>
						<NativeSelect
							onChange={this.onValueChange}
							name="txtType"
							id="txtType"
							className={classes.selectEmpty}
						>
							<option value="1">Nhân viên</option>
							<option value="2">Tài xế</option>
							<option value="3">Quản lý</option>
						</NativeSelect>
						<Button variant="contained" color="primary" className={classes.button}
							onClick={() => this.onLoginClick(this.state.username, this.state.password, this.state.type)}
						>
							Đăng nhập
      					</Button>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={12} className={classes.root}>
					<Typography style={{ fontFamily: 'roboto medium', marginBottom: 50, marginTop: 20 }} variant="h4" gutterBottom>
						Dịch vụ đặt xe online
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={4} className={classes.root}>
					<div style={{ flexDirection: 'column' }}>
						<img src={av1} alt="av1" className={classes.av} />
						<Typography style={{ textAlign: 'center', fontFamily: 'roboto medium', marginBottom: 50, marginTop: 20 }} variant="h6" gutterBottom>
							Hỗ trợ
						<br />
							<StarIcon />
							<StarIcon />
							<StarIcon />
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={4} className={classes.root}>
					<div style={{ flexDirection: 'column' }}>
						<img src={av2} alt="av2" className={classes.av} />
						<Typography style={{ textAlign: 'center', fontFamily: 'roboto medium', marginBottom: 50, marginTop: 20 }} variant="h6" gutterBottom>
							Phương tiện khác
						<br />
							<StarIcon />
							<StarIcon />
							<StarIcon />
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={4} className={classes.root}>
					<div style={{ flexDirection: 'column' }}>
						<img src={av3} alt="av3" className={classes.av} />
						<Typography style={{ textAlign: 'center', fontFamily: 'roboto medium', marginBottom: 50, marginTop: 20 }} variant="h6" gutterBottom>
							Theo dõi hành trình
						<br />
							<StarIcon />
							<StarIcon />
							<StarIcon />
						</Typography>
					</div>
				</Grid>
			</Grid>
		)
	}
}
const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
	img: {
		position: 'relative',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'initial',
		},
	},

	label: {
		color: 'black',
		fontFamily: 'roboto black',
		marginBottom: 10,
		marginTop: 10,
		[theme.breakpoints.up("md")]: {
			color: 'white',
		},
	},
	label2: {
		marginTop: 10,
		fontSize: 20,
		marginLeft: 18,
		textAlign: 'left',
		color: 'black',
		fontFamily: 'roboto medium',
		marginBottom: 10,
		[theme.breakpoints.up("md")]: {
			color: 'white',
		},
	},

	formlogin: {
		width: 341,
		height: 370,
		top: 100,
		left: 92,
		textAlign: 'center',
		position: 'static',
		[theme.breakpoints.up('md')]: {
			position: 'absolute',
			textAlign: 'center',
			color: "#fff",
			boxSizing: "border-box",
			background: "rgba(0,0,0,0.5)"
		}
	},
	input: {
		height: 30,
		width: 300,
		fontFamily: 'roboto regular',
		fontSize: 16,
	},

	selectEmpty: {
		backgroundColor: 'white',
		marginRight: 153,
		width: 150,
	},
	button: {
		marginTop: 20,
	},
	av: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: '58%',
	}
});

const mapStateToProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return {
		doLogin: (username, password, type) => dispatch(login(username, password, type))
	};
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));