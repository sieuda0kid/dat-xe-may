import {
    getAllTripApi, getTripByDriverIdApi, addCustomerAndTripApi, getTripByStatusApi,
    getTripNonLocationApi, updateTripLocationApi, getLocationDriverApi,
    getTripByTripIdApi,
} from "../../api/AppApi";

export const getAllTrip = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            var access_token = sessionStorage.getItem('access_token');
            var refresh_token = sessionStorage.getItem('refresh_token');
            getAllTripApi(access_token, refresh_token)
                .then((responseJson) => {
                    console.log('getAllTripApi api response: ', responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const getTripByDriverId = (driverId) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            var access_token = sessionStorage.getItem('access_token');
            var refresh_token = sessionStorage.getItem('refresh_token');
            getTripByDriverIdApi(access_token, refresh_token, driverId)
                .then((responseJson) => {
                    console.log('getTripByDriverIdApi api response: ', responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const addCustomerAndTrip = (customerInfo, note) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            var access_token = sessionStorage.getItem('access_token');
            var refresh_token = sessionStorage.getItem('refresh_token');
            addCustomerAndTripApi(access_token, refresh_token, customerInfo, note)
                .then((responseJson) => {
                    console.log('getTripByDriverIdApi api response: ', responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const getTripByStatus = statusId => {
    return dispatch => {
        const promise = new Promise((resolve, reject) => {
            var access_token = sessionStorage.getItem("access_token");
            var refresh_token = sessionStorage.getItem("refresh_token");
            getTripByStatusApi(access_token, refresh_token, statusId)
                .then(responseJson => {
                    resolve(responseJson);
                })
                .catch(error => {
                    console.log(error);
                });
        });
        return promise;
    };
};

export const getTripNonLocation = () => {
    return dispatch => {
        const promise = new Promise((resolve, reject) => {
            var access_token = sessionStorage.getItem("access_token");
            var refresh_token = sessionStorage.getItem("refresh_token");
            getTripNonLocationApi(access_token, refresh_token)
                .then(responseJson => {
                    resolve(responseJson);
                })
                .catch(error => {
                    console.log(error);
                });
        });
        return promise;
    };
};

export const updateTripLocation = (trip) => {
    return dispatch => {
        const promise = new Promise ((resolve, reject) =>{
            var access_token = sessionStorage.getItem("access_token");
            var refresh_token = sessionStorage.getItem("refresh_token");
            updateTripLocationApi(access_token,refresh_token,trip)
                .then(resJson => {
                    resolve(resJson);
                })
                .catch(error =>{
                    console.log(error);
                })
        });
        return promise;
    }
}

export const getLocationDriver = (address) => {
    return dispatch => {
        const promise = new Promise ((resolve, reject) =>{
            var access_token = sessionStorage.getItem("access_token");
            var refresh_token = sessionStorage.getItem("refresh_token");
            getLocationDriverApi(access_token,refresh_token,address)
                .then(resJson => {
                    resolve(resJson);
                })
                .catch(error =>{
                    console.log(error);
                })
        });
        return promise;
    }
}

export const getTripByTripId = (id) =>{
    return dispatch => {
        const promise = new Promise ((resolve, reject) =>{
            var access_token = sessionStorage.getItem("access_token");
            var refresh_token = sessionStorage.getItem("refresh_token");
            getTripByTripIdApi(access_token,refresh_token,id)
                .then(resJson => {
                    resolve(resJson);
                })
                .catch(error =>{
                    console.log(error);
                })
        });
        return promise;
    }
}