import React from 'react';
import { Grid, Typography, Button } from "@material-ui/core";
import "font-awesome/css/font-awesome.css";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./css.css";
import logo_8 from './logo-8.png';
import container_img from "./city.png";
import left_img from "./land.png";
class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showPassword: false,
		}
	}

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};


	render() {
		const { classes } = this.props
		return (
			<Grid container>
				<div className={classes.container}>
					<div className={classes.left}></div>
				</div>

				<Grid container style={{ position: "relative", height: "10vh" }}>
					<Grid item xs={12} sm={12} md={12} className={classes.logo}>
						<div className={classes.logo}>
							<img src={logo_8} alt="" className={classes.logo_img}/>
							<span >&nbsp;&nbsp;&nbsp;Powered by VIHAT</span>
						</div>
					</Grid>
				</Grid>

				<Grid container className={classes.leftContainer}>
					<Grid item md={1}></Grid>
					<Grid item md={6} className={classes.textLeft} style={{ position: "relative" }}>
						<p className={classes.textContent}>
							vihat.456vihat.vn
						</p>
						<p className={classes.textCompany}>
							VIHAT TECHNOLOGY COMPANY
						</p>
						<p className={classes.textContent}>
							Mang trong mình một tham vọng trở thành một trong những công ty về lĩnh vực công nghệ mobile hàng đầu Việt Nam cũng như vươn ra thế giới với những sản phẩm mang tính thiết thực, chi phí rẻ nhằm tạo điều kiện phát triển cho các doanh nghiệp trong và ngoài nước.
						</p>
						<span className={classes.textSign}>
							Đinh Thái Hà
						</span>
						<br />
						<span className={classes.textContent}>
							GĐ. Đinh Thái Hà <br />
						</span>

						<span className={classes.footer} style={{ position: "absolute", bottom: 0, }}>
							www.456vihat.vn  | support@456vihat.vn <br />
							18001909 | +84844441909br	<br />
							Số 6 , đường 16, Hiệp Bình Chánh, Thủ Đức, HCM <br />
						</span>
					</Grid>
					<Grid item md={1}></Grid>
					<Grid item xs={12} sm={12} md={3} className={classes.paper}>
						<Paper className={classes.root}>
							<Typography className={classes.Typography_Login}>
								Đăng nhập
        					</Typography>
							<Button
								classes={{ root: classes.buttonTop }}>
								<span style={{ color: "#267aff", textAlign: "left" }}>
									Đăng nhập với Facebook
                                </span>
							</Button>
							<Button
								classes={{ root: classes.buttonTop, }}>
								<span style={{ color: "#e94440", textAlign: "left" }}>
									Liên kết với Google
                                </span>
							</Button>

							<Typography className={classes.Typography_or}>
								Hoặc
                            </Typography>

							<Typography style={{ fontStyle: "italic", color: "#e94440", textAlign: "left" }}>
								*Email không hợp lệ
							</Typography>

							<TextField
								id="email"
								className={classNames(classes.margin, classes.textField)}
								variant="outlined"
								placeholder="email@example.com"
							/>

							<Typography className={classes.Typography_pass}>
								Mật khẩu
                            </Typography>

							<TextField
								id="password"
								className={classNames(classes.margin, classes.textField)}
								variant="outlined"
								placeholder="Nhập vào mật khẩu"
								type={this.state.showPassword ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="Toggle password visibility"
												onClick={this.handleClickShowPassword}
											>
												{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							<Typography className={classes.forget_pass}>
								Quên mật khẩu
                            </Typography>

							<Button className={classes.active_button}>
								ĐĂNG NHẬP
							</Button>
							<Typography className={classes.haveAccount}>
								Tôi chưa có tài khoản
                            </Typography>
						</Paper>
					</Grid>
				</Grid>

				<Grid container className={classes.botContainer}>
					<Grid item md={1}>
					</Grid>
					<Grid itemmd={11}>
						icon - icon
					</Grid>
				</Grid>
			</Grid>

		)
	}
}

const fontSize_md_title = "1.125rem";
const fontSize_md_content = "0.875rem";
const fontSize_lg_title = "1.5rem";
const fontSize_lg_content = "1.25rem";
// unit vh
const theme_spacing_unit = 0.4;
const styles = theme => ({
	paper: {
		[theme.breakpoints.down('xs')]: {
			height: "85vmax",
			marginTop: 10.
		}
	},
	container: {
		position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
		width: "100%",
		height: "100%",
		background: `url(${container_img})`,
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center bottom",
		margin: 0,
		padding: 0,
		[theme.breakpoints.down('xs')]: {
			height: "100vmax",
		},
	},

	left: {
		width: "100%",
		height: "100%",
		margin: 0,
		padding: 0,
		background: `url(${left_img})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "left bottom",
		backgroundSize: "95% 100%",
		opacity: 0.8,
	},
	botContainer: {
		position: "relative", height: "5vh",
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		}
	},
	leftContainer: {
		position: "relative", height: "85vh",
	},
	footer: {
		fontFamily: "Roboto",
		color: "white",

		[theme.breakpoints.down(1367)]: {
			fontSize: fontSize_md_content,
		},
		[theme.breakpoints.up(1368)]: {
			fontSize: fontSize_lg_content,
		},
	},
	textLeft: {
		fontFamily: "Roboto",
		color: "#ffffff",
		fontWeight: "normal",
		paddingTop: `calc(1vh * ${theme_spacing_unit} * 12)`,
		[theme.breakpoints.down('sm')]: {
			display: "none",
		}
	},
	textContent: {
		fontStyle: "normal",
		fontStretch: "normal",
		lineHeight: 1.96,
		letterSpacing: "normal",
		textAlign: "left",
		[theme.breakpoints.down(1367)]: {
			fontSize: fontSize_md_title,
		},
		[theme.breakpoints.up(1368)]: {
			fontSize: fontSize_lg_title,
		},
	},
	textSign: {
		fontFamily: "FS Just Awesome Script",
		[theme.breakpoints.down(1367)]: {
			fontSize: "calc(20px * 3.75)",
		},
		[theme.breakpoints.up(1368)]: {
			fontSize: "calc(24px * 3.75)",
		},
	},
	textCompany: {
		[theme.breakpoints.down(1367)]: {
			fontSize: `calc(${fontSize_md_content} * 2.2)`,
		},
		[theme.breakpoints.up(1368)]: {
			fontSize: `calc(${fontSize_lg_content} * 2.2)`,
		},
	},
	root: {
		//theme.spacing.unit = 8px 
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
		height: "100%",
		[theme.breakpoints.down('sm')]: {
			width: "50%",
			marginLeft: "auto",
			marginRight: "auto",
		},
		[theme.breakpoints.down('xs')]: {
			width: "80%",
			marginLeft: "auto",
			marginRight: "auto",
			height: "100%",
		}
	},

	Typography_Login: {
		paddingTop: `calc(1vh * ${theme_spacing_unit} * 12)`,
		paddingBottom: `calc(1vh * ${theme_spacing_unit} * 2)`,
		paddingLeft: 23,
		[theme.breakpoints.down(1367)]: {
			fontSize: fontSize_md_title,
		},
		[theme.breakpoints.up(1368)]: {
			fontSize: fontSize_lg_title,
		},
	},

	Typography_or: {
		// marginTop: theme_spacing_unit * 3,
		// marginBottom: theme_spacing_unit * 3,
		marginTop: `calc(1vh * ${theme_spacing_unit} * 3)`,
		marginBottom: `calc(1vh * ${theme_spacing_unit} * 3)`,
		textAlign: "center",
		color: "#707070",
		opacity: "0.5",
	},

	Typography_pass: {
		color: "#707070",
		paddingLeft: 23,
		[theme.breakpoints.down(1367)]: {
			fontSize: fontSize_md_content,
		},
		[theme.breakpoints.up(1368)]: {
			fontSiz: fontSize_lg_content,
		}
	},

	buttonTop: {
		marginTop: `calc(1vh * ${theme_spacing_unit} * 2)`,
		justifyContent: "left",
		paddingLeft: 24,
		background: 'white',
		borderRadius: 3,
		fontWeight: "400",
		border: 0,
		minHeight: 48,
		width: "100%",
		textTransform: "none",
		borderRadius: "7px",
		boxShadow: '0 5px 16px 0 rgba(112, 112, 112, 0.08)',
		"&:hover": {
			backgroundColor: "white",
			boxShadow: '0 5px 16px 0 rgba(112, 112, 112, 0.2)',
		},
		[theme.breakpoints.down(1367)]: {
			fontSize: fontSize_md_content
		},
		[theme.breakpoints.up(1368)]: {
			fontSize: fontSize_lg_content,
		}
	},
	textField: {
		width: "100%",
		marginTop: `calc(1vh * ${theme_spacing_unit})`,
		marginBottom: `calc(1vh * ${theme_spacing_unit} * 3)`,
		[`& fieldset`]: {
			border: "none",
			borderRadius: "7px",
			boxShadow: "0 5px 16px 0 rgba(112, 112, 112, 0.08)",

		},


		[`& input`]: {
			padding: "18.5px 24px",
			height: 11,
			[theme.breakpoints.down(1367)]:{
				fontSize: fontSize_md_content,
			},
			[theme.breakpoints.up(1368)]: {
				fontSize: fontSize_lg_content,
			},
			'&::-webkit-input-placeholder': { opacity: 0.25 },

		},
		'&:hover': {
			boxShadow: '0 5px 16px 0 rgba(112, 112, 112, 0.2)',
		},
	},
	haveAccount: {
		color: "#267aff !important",
		textAlign: "center",
		fontSize: "0.875rem",
		"&:hover": {
			cursor: "pointer",
		}
	},
	forget_pass: {
		textAlign: "right",
		fontSize: "0.875",
		color: "#707070",
		opacity: 0.5,
		"&:hover": {
			cursor: "pointer",
		}
	},
	active_button: {
		marginLeft: "25%",
		fontWeight: 400,
		marginTop: 15,
		marginTop: `calc(1vh* ${theme_spacing_unit} * 7)`,
		marginBottom: `calc(1vh * ${theme_spacing_unit} * 3)`,
		fontSize: "0.875rem",
		color: "#ffffff",
		width: "50%",
		borderRadius: 7,
		backgroundImage: "linear-gradient(to bottom, #01b8fa, #267aff)",
		boxShadow: "0 4px 16px 0 rgba(38, 122, 255, 0.5)",
		"&:hover": {
			boxShadow: "0px 4px 16px 0px rgba(38, 122, 255, 0.8)",
		},
		"&:focus": {
			boxShadow: "0px 4px 16px 0px rgba(38, 122, 255, 0.5)",
		}
	},
	logo: {
		fontFamily: 'Roboto',
		textAlign: "center",
		marginTop: "auto",
		marginBottom: "auto",
		float: "right",
		marginRight: 5,
	},

	logo_img: {
		width: 40,
		height: 40,
		verticalAlign: "middle",
	},

	logo_p: {
		float: "right",
		marginTop: 24,
		marginRight: 46,
	},
});

export default withStyles(styles)(Home);