var BASE_URL = 'http://localhost:8888/'

function fetchApi(url, method, data){
    var path = BASE_URL + url;
    console.log(path);
    console.log(data)
    return fetch(path,
    {
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json; charset=utf-8",
        },
        method: method,
        body: JSON.stringify(data)
    }).then(response => response.json());
}
export function loginApi(username, password) {
    var body = {
        username: username,
        password: password
    }
    return fetchApi('user/login', 'POST', body);
}

export function getUserByTokenApi(access_token, refresh_token){
    var body = {
        access_token: access_token,
        refresh_token: refresh_token
    }
    return fetchApi('user/getUserByToken', 'POST', body);
}

export function getUserByIdApi(access_token, refresh_token, id){
    var body = {
        access_token: access_token,
        refresh_token: refresh_token,
        id: id
    }
    return fetchApi('user/getUser', 'POST', body);
}

export function getUserForTypeApi(access_token, refresh_token, dif){
    var body = {
        access_token: access_token,
        refresh_token: refresh_token,
        dif: dif
    }
    return fetchApi('user/getUserForType', 'POST', body);
}

export function getAllTripApi(access_token, refresh_token){
    var body = {
        access_token: access_token,
        refresh_token: refresh_token,
    }
    return fetchApi('trip/getAllTrip', 'POST', body);
}

export function getTripByDriverIdApi(access_token, refresh_token, driverId){
    var body = {
        access_token: access_token,
        refresh_token: refresh_token,
        driverID: driverId,
    }
    return fetchApi('trip/getTripByDriverId', 'POST', body);
}

export function addCustomerAndTripApi(access_token, refresh_token, customerInfo, note){
    var body = {
        access_token: access_token,
        refresh_token: refresh_token,
        customerName: customerInfo.customerName,
        customerPhone: customerInfo.customerPhone,
        customerAddress: customerInfo.customerAddress,
        note: note,
        isDelete: 0
    }
    return fetchApi('trip/addCustomerAndTrip', 'POST', body);
}

export function getTripByStatusApi(access_token, refresh_token, statusId){
    var body = {
        access_token: access_token,
        refresh_token: refresh_token,
        status: statusId,
    }
    return fetchApi('trip/getTripByStatus', 'POST', body);
}
export function getTripNonLocationApi(access_token, refresh_token){
    var body = {
        access_token: access_token,
        refresh_token: refresh_token,
    }
    return fetchApi('trip/getTripNonLocation', 'POST', body);
}