import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import TopHomeView from './../../assets/images/TopHomeView.png';
import av1 from './../../assets/images/av1.png';
import av2 from './../../assets/images/av2.png';
import av3 from './../../assets/images/av3.png';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { login, getUserInfo } from "../../store/actions/user";
import { Grid, Typography, Button } from "@material-ui/core";
import Footer from "./../../components/Home/Footer";
import Header from '../../components/Home/HomeHeader.jsx'
import io from 'socket.io-client';
const socket = io('http://localhost:8888')
class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',

			loginError: '',
			userType: -1,

			isLoading: false,
		};
	}


	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	onLogin = (username, password) => {
		this.props.doLogin(username, password)
			.then(resJson => {
				if (resJson.returnCode === 1) {
					this.props.doGetUserInfo(resJson.user.userId);
					socket.emit('send_refresh_token', resJson.user.refresh_token);
					this.setState({
						loginError: '',
						userType: resJson.user.userType,
					})
					if (resJson.user.userType !== 4) {
						this.props.history.push('/dashboard')
					} else {
						this.props.history.push('/driver')
					}
				} else {
					this.setState({
						loginError: 'Tài khoản hoặc mật khẩu không chính xác'
					})
				}
			})
			.catch(error => {
				console.log('Login error', error);
			})
	}

	componentWillMount() {
		console.log("access_token", sessionStorage.getItem('access_token'));
		
		if (sessionStorage.getItem('access_token') !== null) {
			this.props.history.push('/dashboard')
		}
	}

	render() {
		const { classes } = this.props
		return (
			<Grid container space={0}>
				<Grid item xs={12} sm={12} md={12}>
					<Header/>
				</Grid>
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
							onChange={this.handleChange('username')}
						/>
						<Typography className={classes.label2}>
							Mất khẩu
						</Typography>
						<input type="password" id="txtPassword" name="txtPassword" placeholder="Nhập mất khẩu" className={classes.input}
							onChange={this.handleChange('password')}
						/>
						{this.state.loginError !== ''
							?
							<Typography className={classes.error}>
							<span style={{color: "red", fontSize: 25, fontWeight: 900}}>* </span>
							{this.state.loginError}
							<span style={{color: "red", fontSize: 25, fontWeight: 900}}> *</span>
							</Typography>
						: null}
						<Button variant="contained" color="primary" className={classes.button}
						onClick={()=>this.onLogin(this.state.username, this.state.password)}
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
				<Grid item xs={12} sm={12} md={12}>
					<Footer/>
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

	error: {
		marginTop: 20,
		fontSize: 18,
		textAlign: 'left',
		marginLeft: 2,
		color: 'red',
		fontFamily: 'roboto bold',
		marginBottom: 10,
		[theme.breakpoints.up("md")]: {
			color: 'white',
		},
	},

	formlogin: {
		width: 350,
		height: 370,
		top: 127,
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
		marginBottom: 20,
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

const mapDispatchToProps = dispatch => {
	return {
		doGetUserInfo: (id) => dispatch(getUserInfo(id)),
		doLogin: (username, password) => dispatch(login(username, password))
	};
  };
  
  export default withStyles(styles)(connect(null, mapDispatchToProps)(Home));