import { getAllTripApi, getTripByDriverIdApi, addCustomerAndTripApi } from "../../api/AppApi";

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