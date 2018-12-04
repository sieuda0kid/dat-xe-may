import React from 'react';
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo.png";
import MenuIcon from '@material-ui/icons/Menu';
import { Typography, Button, Drawer, List, ListItemText, ListItem, Hidden, IconButton } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
class HomeHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openLeft: false,
        };
    }

    toggleDrawer = () => {
        this.setState(
          state => ({openLeft: !state.openLeft})
        );
      };

    render() {
        const { classes } = this.props

        const slide = (
            <div style={{ width: 250 }}>
                <List>
                    <Link to="/customer" style={{ textDecoration: 'none', fontFamily: 'roboto medium', fontSize: 18 }}>
                        <ListItem button>
                            <ListItemText primary="Khách hàng" />
                        </ListItem>
                    </Link>
                </List>
            </div>
        )
        return (
            <div className={classes.root}>
                
                <Drawer open={this.state.openLeft} onClose={this.toggleDrawer}>
                    <div
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        {slide}
                    </div>
                </Drawer>
                
                <Hidden smDown implementation="css">
                <Link to="/home" style={{ textDecoration: 'none', marginRight: 50 }}>
                    <img src={logo} alt="logo" width="55" height="45" style={{ float: 'left' }} />
                    <div style={{ marginTop: 11, marginLeft: 5, display: 'inline', float: 'left' }}>
                        <Typography style={{ fontFamily: 'roboto medium', fontSize: 23 }}>
                            BikeGrab
                    </Typography>
                    </div>
                </Link>
                <Link to="/customer" style={{ textDecoration: 'none' }}>
                    <Button size="large" className={classes.Buttons}>Khách hàng</Button>
                </Link>
                

                </Hidden>
                <div className={classes.navIconHide}>
                <Link to="/home" style={{ textDecoration: 'none', marginRight: 50 }}>
                    <img src={logo} alt="logo" width="55" height="45" style={{ float: 'left' }} />
                    <div style={{ marginTop: 11, marginLeft: 5, display: 'inline', float: 'left' }}>
                        <Typography style={{ fontFamily: 'roboto medium', fontSize: 23 }}>
                            BikeGrab
                        </Typography>
                    </div>
                </Link>
                <IconButton
                    onClick={this.toggleDrawer}
                    className={classes.navIconHide}
                    style={{float:'right'} }>
                    <MenuIcon/>
                </IconButton>
                </div>
                
            </div>
        )
    }
}

const styles =  theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Buttons: {
        textTransform: 'inherit',
        marginRight: 20,
        marginTop: 9,
        fontSize: 18,
        color: '#00acc1',
        fontFamily: 'roboto regular',
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
});

export default withStyles(styles)(HomeHeader);