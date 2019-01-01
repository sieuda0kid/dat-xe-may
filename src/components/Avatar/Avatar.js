import React from "react";
// @material-ui/core
import { Typography } from "@material-ui/core";

class Avatar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    stringToColour = (str) => {
        if (str != null) {
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            var colour = '#';
            for (var j = 0; j < 3; j++) {
                var value = (hash >> (j * 8)) & 0xFF;
                colour += ('00' + value.toString(16)).substr(-2);
            }
            return colour;
        }
        return '#B9C5D4';
    }

    componentDidMount() {
    }

    static get defaultProps() {
        return {
            width: 120,
        }
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                width: this.props.width,
                height: this.props.width,
                borderRadius: this.props.width / 2,
                backgroundColor: this.stringToColour(this.props.colorString),
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: this.props.width / 2,
                    color: '#FFFFFF',
                    textAlign: 'center',
                }}>
                    {(this.props.content != null ? this.props.content[0].toUpperCase() : '')}</Typography>
            </div>
        );
    }
}

export default Avatar;