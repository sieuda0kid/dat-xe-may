import { SAVE_PROFILE } from './actionType';
import {
    loginApi, getUserByTokenApi, getUserByIdApi, getUserForTypeApi
} from '../../api/AppApi';
var md5 = require('md5');

export const login = (username, password) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            var md5Password = md5(password);
            loginApi(username, md5Password)
                .then((responseJson) => {
                    console.log('login api response: ', responseJson);
                    if (responseJson.returnCode === 1) {
                        var access_token = responseJson.user.access_token;
                        var refresh_token = responseJson.user.refresh_token;
                        sessionStorage.setItem('access_token', access_token);
                        sessionStorage.setItem('refresh_token', refresh_token);
                        var user = responseJson.user;
                        dispatch(saveProfile(user));
                    }
                    dispatch(saveProfile(null));
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const getUserByToken = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            var access_token = sessionStorage.getItem('access_token');
            var refresh_token = sessionStorage.getItem('refresh_token');
            getUserByTokenApi(access_token, refresh_token)
                .then((responseJson) => {
                    console.log('getUserByToken api response: ', responseJson);
                    if (responseJson.returnCode === 1) {
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
    }
}

export const getUserInfo = (id) => {
    return (dispatch) => {
        var access_token = sessionStorage.getItem('access_token');
        var refresh_token = sessionStorage.getItem('refresh_token');
        console.log("get user info");
        getUserByIdApi(access_token, refresh_token, id)
            .then((responseJson) => {
                console.log('getUserInfo api response: ', responseJson);
                if (responseJson.returnCode === 1) {
                    var user = responseJson.user;
                    dispatch(saveProfile(user));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const getUserForType = (dif) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            var access_token = sessionStorage.getItem('access_token');
            var refresh_token = sessionStorage.getItem('refresh_token');
            getUserForTypeApi(access_token, refresh_token, dif)
                .then((responseJson) => {
                    console.log('getUserForType api response: ', responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const saveProfile = (profile) => {
    return {
        type: SAVE_PROFILE,
        profile: profile
    };
}