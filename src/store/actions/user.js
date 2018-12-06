import { SAVE_PROFILE } from './actionType';

import { loginApi }
    from '../../api/AppApi';

export const saveProfile = (profile) => {
    return {
        type: SAVE_PROFILE,
        profile: profile,
    };
}

export const login = (username, password, type) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            console.log('login_action: ' + username + " " + password + " " + type);
            loginApi(username, password, type)
                .then((responseJson) => {
                    var token = responsJson.token;
                    sessionStorage.setItem('token', token);
                    var user = responseJson.user;
                    var u = {
                        username: user.username,
                        password: user.password,
                        type: user.type,
                        status: user.status,
                        location: user.location,
                    }
                    if (responseJson.returnCode == 1) {
                        dispatch(saveProfile(u));
                        resolve(responseJson);
                    }
                }).catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    };
}