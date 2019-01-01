import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, Button } from '@material-ui/core';
import footerStyle from "./../../assets/jss/footerStyle.jsx";
function Footer({ ...props }) {
  const { classes} = props;
  return (
    <footer className={classes.footer}>
    <div className={classes.container}>
            <Grid container space={12}>
            <Grid item xs={12} sm={12} md={3} >
            <h2><a className={classes.logo} href="/"> Tesla </a></h2>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
            <h5 className={classes.h5}>Bắt đầu</h5>
                    <ul className={classes.ul}>
                        <li><a className={classes.a} href="/">Trang chủ</a></li>
                        <li><a className={classes.a}  href="/">Đăng nhập</a></li>
                    </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
            <h5 className={classes.h5}>Về chúng tôi</h5>
                    <ul className={classes.ul}>
                        <li><a className={classes.a}  href="/">Thông tin công ty</a></li>
                        <li><a className={classes.a}  href="/">Đánh giá</a></li>
                    </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
            <h5 className={classes.h5}>Hỗ trợ</h5>
                    <ul className={classes.ul}>
                        <li><a  className={classes.a} href="/">FAQ</a></li>
                        <li><a  className={classes.a} href="/">Blog</a></li>
                        <li><a  className={classes.a} href="/">Forums</a></li>
                    </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
            <div className={classes.social_networks}>
                        <a className={classes.social_networks_twitter} href="/"><i className="fa fa-twitter"></i></a>
                        <a className={classes.social_networks_google} href="/"><i className="fa fa-facebook"></i></a>
                        <a className={classes.social_networks_facebook} href="/"><i className="fa fa-google-plus"></i></a>
            </div>
            <Button variant="contained" color="secondary" className={classes.Button}>
                    Liên hệ
            </Button>
            </Grid>
            </Grid>
        <div className={classes.footerCopyright}>
            <p>&copy; {(new Date().getFullYear())} STORM All Rights Reserved</p>
        </div>
    </div>
    </footer>
    
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
