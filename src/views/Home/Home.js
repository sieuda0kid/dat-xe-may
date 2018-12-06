import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Typography, NativeSelect, Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import TopHomeView from './../../assets/images/TopHomeView.png';
import av1 from './../../assets/images/av1.png';
import av2 from './../../assets/images/av2.png';
import av3 from './../../assets/images/av3.png';
import {loginApi} from "./../../api/AppApi";
class Home extends React.Component {

	onLoginClick = () => {
        loginApi("abc", "abc","1").then(res => console.log(res))
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
						<input type="text" name="username" placeholder="Nhập tên tài khoản" className={classes.input} />
						<Typography className={classes.label2}>
							Mất khẩu
						</Typography>
						<input type="password" name="password" placeholder="Nhập mất khẩu" className={classes.input} />
						<Typography className={classes.label2}>
							Loại tài khoản
						</Typography>
						<NativeSelect
							// value={this.state.age}
							// onChange={this.handleChange('age')}
							name="age"
							className={classes.selectEmpty}
						>
							<option value={10}>Nhân viên</option>
							<option value={20}>Tài xế</option>
							<option value={30}>Quản lý</option>
						</NativeSelect>
						<Button variant="contained" color="primary" className={classes.button}
						onClick={() => this.onLoginClick()}
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
			color:'white',
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
export default withStyles(styles)(Home);