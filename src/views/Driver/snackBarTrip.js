import React, { Component } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  info: InfoIcon,
};

const styles1 = theme => ({
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {message}
        </span>
      }
      action={[
          <div>
        
          <div>
          <Button variant="contained" color="secondary" key="close"
          aria-label="Close"
          className={classes.close}
          style={{width: 80}}
          onClick={onClose}
          >
              Nhận
          <CloseIcon className={classes.icon} />
          </Button>
          </div>
          <div style={{marginTop: 10}}>
          <Button variant="contained" color="secondary" key="close"
          aria-label="Close"
          className={classes.close}
          style={{width: 80}}
          onClick={onClose}
          >
              Hủy
          <CloseIcon className={classes.icon} />
          </Button>
          </div>
          </div>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});



class snackBarTrip extends React.Component {
  state = {
    open: this.props.open,
    name: 'Nguyên Tuấn',
    phone: '01239291213',
    address: 'Khoa học tự nhiên',
    note: 'gấn quán cafe ABC',
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{
        position: "absolute",
        bottom: 10,
        left: window.innerWidth * 0.1,
        right: window.innerWidth * 0.1,
        backgroundColor: "#F2F2F2",
        minWidth: 300
      }}>
       <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          //10s tự động mất
          autoHideDuration={36000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="info"
            message={
                <div style={{fontFamily: 'roboto', fontSize: 16}}>
                    <span>Tên khách hàng: {this.state.name}</span><br/><br/>
                    <span>Địa chỉ đón khách: {this.state.address}</span><br/><br/>
                    <span>Số diện thoại: {this.state.phone}</span><br/><br/>
                    <span>Ghi chú: {this.state.note}</span>
                </div>
            }
          />
        </Snackbar>
      </div>
      </div>
    );
  }
}

export default withStyles(styles2)(snackBarTrip);