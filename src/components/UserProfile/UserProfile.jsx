import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import Card from "../Card/Card.jsx";
import CardAvatar from "../Card/CardAvatar.jsx";
import CardBody from "../Card/CardBody.jsx";
import moment from 'moment';
import Avatar from "../Avatar/Avatar.js"

class UserProfile extends React.Component {

    render() {
        const { classes, userInfo } = this.props;
        return ( 
            <Card profile >
            <CardAvatar profile >
                <Avatar content = { userInfo.fullname[0] }
            colorString = { userInfo.phone }/> 
            </CardAvatar> 
            <CardBody profile >
                <div style = {{ display: 'flex', flexDirection: 'column' } } >
                    <div style = {{ display: 'flex', flexDirection: 'column' } } >
                        <Typography className = { classes.username } > { userInfo.fullname }></Typography> 
                        <Typography className = { classes.usercategory } > { userInfo.userType } </Typography> 
                    </div>

                    <div style = {{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 } } >
                        {/*<div style = {{ display: 'flex', flexDirection: 'column', marginRight: 10, width: '100%' } } >
                            <Typography className = { classes.userInfoLabel } > Ngày sinh </Typography> 
                            <Typography className = { classes.userdob } > { moment(userInfo.dob).format('DD/MM/YYYY') } </Typography> 
                        </div>*/} 
                        <div style = {{ display: 'flex', flexDirection: 'column', marginLeft: 10, width: '100%' } } >
                            <Typography className = { classes.userInfoLabel } > Số điện thoại </Typography> 
                            <Typography className = { classes.userphone } > { userInfo.phone } </Typography> 
                        </div> 
                    </div> 
                </div> 
                {/* <Button color="primary" round style={{marginTop: 20}}>Follow</Button> */} 
            </CardBody> 
            </Card>
        );
    }
}


const styles = {
    username: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
    },
    usercategory: {
        fontFamily: 'Roboto-Light',
        fontSize: 15,
    },
    userInfoLabel: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    userdob: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
    },
    userphone: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
    },
};

export default withStyles(styles)(UserProfile);