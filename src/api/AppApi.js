var BASE_URL = 'http://localhost:8888/'
var md5 = require('md5');

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

export function loginApi(username, password,type) {
    var body = {
        username: username,
        password: md5(password),
        type: type,
    }
    return fetchApi('user/login', 'POST', body);
}