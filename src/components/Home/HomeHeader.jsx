import React from 'react';
import { Link, Redirect } from "react-router-dom";
import logo from "./../../assets/images/logo.png";
import MenuIcon from '@material-ui/icons/Menu';
import { Typography, Button, Drawer, List, ListItemText, ListItem, Hidden, IconButton } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
class HomeHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Link to="/home" style={{ textDecoration: 'none', marginRight: 50 }}>
                    <img src={logo} alt="logo" width="80" height="70" style={{ float: 'left' }} />
                    <div style={{ marginTop: 11, marginLeft: 5, display: 'inline', float: 'left' }}>
                        <Typography style={{ fontFamily: 'roboto medium', fontSize: 23, marginTop: 10, marginLeft: -10 }}>
                            Tesla
                    </Typography>
                    </div>
                </Link>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        marginBottom: 30,
        marginTop: 10,
        marginLeft: 5,
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