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

    constructor(props) {
        super(props);

        this.state = {
            HoTen: '',
            DienThoai: '',
            DiaChi: '',
            GhiChu: '',

            msgErrorHoTen: '',
            msgErrorDienThoai: '',
            msgErrorHoDiaChi: '',

            dem: 0,
            dialogAlertMessage: '',
            showDialog: false,
        };
    }

    checkValidation = (HoTen, DienThoai, DiaChi, note) => {
        var dem = 0;
        if (HoTen == '') {
            this.setState({ msgErrorHoTen: 'Nhập họ tên' })
            dem++;
        } else {
            this.setState({ msgErrorHoTen: '' })
        }

        if (DienThoai == '') {
            this.setState({ msgErrorDienThoai: 'Nhập số điện thoại' })
            dem++;
        } else {
            this.setState({ msgErrorDienThoai: '' })
        }

        if (DiaChi == '') {
            this.setState({ msgErrorHoDiaChi: 'Nhập địa chỉ' })
            dem++;
        } else {
            this.setState({
                msgErrorHoDiaChi: ''
            })
        }

        this.setState({
            dem: dem
        })

        if (dem > 0) {
            return false;
        }
        return true;
    }

    onReceiveClick = () => {
        var check = this.checkValidation(this.state.HoTen, this.state.DienThoai, this.state.DiaChi);

    }

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
            Typography style = {
                { color: 'red' } }
            component = "p" > { this.state.msgErrorHoTen } <
            /Typography> <
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
            Typography style = {
                { color: 'red' } }
            component = "p" > { this.state.msgErrorDienThoai } <
            /Typography> <
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
            Typography style = {
                { color: 'red' } }
            component = "p" > { this.state.msgErrorHoDiaChi } <
            /Typography> <
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
            color = "primary"
            onClick = { this.onReceiveClick } >
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