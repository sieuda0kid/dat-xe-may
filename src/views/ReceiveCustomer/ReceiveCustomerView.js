import React from 'react';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import classNames from 'classnames';
//import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class ReceiveCustomer extends React.Component {
    render() {
        const { classes } = this.props;
        return ( <
            div >
            <
            Grid container justify = "center"
            alignItems = "center" >
            <
            Card style = {
                { width: '60%' } } >
            <
            CardContent >
            <
            Typography gutterBottom variant = "h5"
            component = "h2" >
            Thông tin đặt xe của khách <
            /Typography> <
            div style = {
                { width: '100%' } } >
            <
            TextField id = "standard-dense"
            label = "Họ tên"
            margin = "dense"
            style = {
                { width: '100%' } }
            /> <
            /div> <
            div style = {
                { width: '100%' } } >
            <
            TextField id = "standard-dense"
            label = "Số điện thoại"
            margin = "dense"
            style = {
                { width: '100%' } }
            /> <
            /div> <
            div style = {
                { width: '100%' } } >
            <
            TextField id = "standard-dense"
            label = "Địa chỉ đón khách"
            margin = "dense"
            style = {
                { width: '100%' } }
            /> <
            /div> <
            div style = {
                { width: '100%' } } >
            <
            TextField id = "standard-dense"
            label = "Ghi chú"
            margin = "dense"
            multiline rows = "3"
            style = {
                { width: '100%' } }
            /> <
            /div>

            <
            /CardContent> <
            CardActions >
            <
            Button variant = "contained"
            color = "primary" >
            Nhận khách <
            /Button> <
            /CardActions> <
            /Card> <
            /Grid> <
            /div>
        )
    }
}

export default ReceiveCustomer;