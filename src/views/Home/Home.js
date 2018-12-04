import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import TopHomeView from './../../assets/images/TopHomeView.png';
import av1 from './../../assets/images/av1.png';
import av2 from './../../assets/images/av2.png';
import av3 from './../../assets/images/av3.png';

class Home extends React.Component {
	render() {
		const { classes } = this.props
		return (
			<Grid container space={12}>
				<Grid item xs={12} sm={12} md={12} className={classes.root}>
					<img src={TopHomeView} alt="TopHomeView" className={classes.img} />
				</Grid>
				<Grid item xs={12} sm={12} md={12} className={classes.root}>
					<Typography style={{ fontFamily: 'roboto medium', marginBottom: 50, marginTop: 20 }} variant="h4" gutterBottom>
						Dịch vụ đặt xe online
					</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={4} className={classes.root}>
					<div style={{flexDirection: 'column'}}>
					<img src={av1} alt="av1" className={classes.av} />
					<Typography style={{ textAlign: 'center', fontFamily: 'roboto medium', marginBottom: 50, marginTop: 20 }} variant="h6" gutterBottom>
						Hỗ trợ
						<br/>
						<StarIcon/>
						<StarIcon/>
						<StarIcon/>
					</Typography>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={4} className={classes.root}>
				<div style={{flexDirection: 'column'}}>
					<img src={av2} alt="av2" className={classes.av} />
					<Typography style={{ textAlign: 'center', fontFamily: 'roboto medium', marginBottom: 50, marginTop: 20 }} variant="h6" gutterBottom>
						Phương tiện khác
						<br/>
						<StarIcon/>
						<StarIcon/>
						<StarIcon/>
					</Typography>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={4} className={classes.root}>
				<div style={{flexDirection: 'column'}}>
					<img src={av3} alt="av3" className={classes.av} />
					<Typography style={{ textAlign: 'center', fontFamily: 'roboto medium', marginBottom: 50, marginTop: 20 }} variant="h6" gutterBottom>
						Theo dõi hành trình
						<br/>
						<StarIcon/>
						<StarIcon/>
						<StarIcon/>
					</Typography>
					</div>
				</Grid>
			</Grid>
		)
	}
}
const styles = {
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
	img: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},

	av: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: '58%',
	}
};
export default withStyles(styles)(Home);