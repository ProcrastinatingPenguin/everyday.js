var everyday = {}; //Declares the everyday object

// getJSON(url, successHandler) - Get the JSON from a URL and execute declaired function on Success.
everyday.getJSON = function (url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
        var status;
        var data;
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};

//random(min, max)
everyday.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//createRandomId - Generates a random id.
everyday.createRandomId = function () {
    var randomId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        //generate an RFC4122 version 4 compliant random id
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return randomId;
}

//makeCookie(name, value, days)
everyday.makeCookie = function (name, value, days) {
    var expires = "",
        date;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


//readCookie(name, value, days)
everyday.readCookie = function (name) {
    var nameEQ = name + "=",
        ca = document.cookie.split(';'),
        i,
        c;
    i = ca.length;
    while (i--) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

//killCookie(name)
everyday.killCookie = function (name) {
    makeCookie(name, '', -1);
}