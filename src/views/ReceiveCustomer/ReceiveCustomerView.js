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

class ReceiveCustomer extends React.Component {
    render() {
        const { classes } = this.props;
        return ( <
            div >
            <
            Card >
            <
            CardContent >
            <
            Typography gutterBottom variant = "h5"
            component = "h2" >
            Thông tin đặt xe của khách <
            /Typography> <
            div style = {
                { width: '100%', padding: 20 } } >
            <
            TextField id = "standard-dense"
            label = "Họ tên"
            margin = "dense"
            style = {
                { width: '100%' } }
            /> <
            /div> <
            div >
            <
            TextField id = "standard-dense"
            label = "Số điện thoại"
            margin = "dense" /
            >
            <
            /div> <
            div >
            <
            TextField id = "standard-dense"
            label = "Địa chỉ đón khách"
            margin = "dense" /
            >
            <
            /div> <
            div >
            <
            TextField id = "standard-dense"
            label = "Ghi chú"
            margin = "dense" /
            >
            <
            /div>


            <
            /CardContent> <
            CardActions >
            <
            Button size = "small" > Nhận khách < /Button> <
            /CardActions> <
            /Card> <
            /div>
        )
    }
}


export default ReceiveCustomer;