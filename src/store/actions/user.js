import { SAVE_PROFILE } from './actionType';
import { loginApi }
    from '../../api/AppApi';
// import decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
export const saveProfile = (profile) => {
    return {
        type: SAVE_PROFILE,
        profile: profile,
    };
}

export const login = (username, password, type) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            loginApi(username, password, type)
                .then((responseJson) => {
                    if (responseJson.returnCode === 1) {
                        var access_token = responseJson.user.access_token;
                        var refresh_token = responseJson.user.refresh_token;
                        localStorage.setItem('access_token', access_token);
                        localStorage.setItem('refresh_token', refresh_token);
                        var user = responseJson.user;
                        dispatch(saveProfile(user));
                    }
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    };
}

export const checkToken = (access_token) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            // const { exp } = decode(access_token);
            // let date = Date.now() / 1000;
            // console.log('exp ' + exp);
            // console.log('date ' + date);
            var res = {
                returnCode: '',
            };
            jwt.verify(access_token, 'token', function (err, user) {
                if (err) {
                    if (err.message === 'jwt expired')
                        res.returnCode = 1;
                } else {
                    res.returnCode = 2;
                }
            })
            resolve(res);
        })
        return promise;
    };
}