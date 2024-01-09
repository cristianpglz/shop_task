// userData.js

var geolocationSearch;

function userData() {
    var userName = document.getElementById('userName').value;
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;

    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('email', userEmail);
    sessionStorage.setItem('password', userPassword);
    sessionStorage.setItem('geolocationSearch', geolocationSearch);
}

function getUserData() {
    var userName = sessionStorage.getItem('userName');
    var userEmail = sessionStorage.getItem('email');
    var userPassword = sessionStorage.getItem('password');
    geolocationSearch = sessionStorage.getItem('geolocationSearch');

    return { userName, userEmail, userPassword, geolocationSearch };
}

function checkUserData() {
    var { userName } = getUserData();

    if (userName == null) {
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario');
        return false;
    }
    console.log("Estoy aquí");
    return true;
}

function locationData() {
    if (!navigator.geolocation) {
        geolocationSearch = "El navegador no es compatible con la API de Geolocalización";
    } else {
        navigator.geolocation.getCurrentPosition(
            // Success
            (position) => { geolocationSearch = 'Latitud:' + position.coords.latitude + ', Longitud:' + position.coords.longitude },
            // Error
            () => { geolocationSearch = "La geolocalización no se ha podido realizar"; }
        );
    }
}


function userHistory() {
    var { userName, userEmail, userPassword } = getUserData();

    var historyStorage = localStorage.getItem('history');
    var history;

    if (historyStorage == null) {
        history = [];
    } else {
        history = JSON.parse(historyStorage);
    }

    var userRecord = {
        user: userName,
        date: Date.now()
    };

    history.push(userRecord);
    localStorage.setItem('history', JSON.stringify(history));
}
