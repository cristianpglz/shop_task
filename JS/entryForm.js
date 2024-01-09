/* 
    JS EntryForm
*/

// VARIABLES
var img;
var showHidePassword;
var userName;
var userEmail;
var userPassword;
var error;
var checkform;

document.addEventListener('DOMContentLoaded', function() {
    // Capture all elements after DOM has loaded
    img = document.getElementsByClassName('eye-buton').src;
    showHidePassword = document.getElementById('show-hide-password');
    userName = document.getElementById('userName');
    userEmail = document.getElementById('email');
    userPassword = document.getElementById('password');
    error = document.getElementById('error');
    checkform = document.getElementById('formEntry');

    // Check Password
    if (showHidePassword) {  // Check if showHidePassword is not undefined
        showHidePassword.onclick = function() {
            if (userPassword.type == "password") {
                userPassword.type = "text";
                showHidePassword.innerHTML = '<img class="eye-buton" src="./IMGs/eye-check.png" width="30px" alt="">';
            } else {
                userPassword.type = "password";
                showHidePassword.innerHTML = '<img class="eye-buton" src="/IMGs/dont check.png" width="25px" alt="">';
            }
        }
    }

    // Add submit event to the form
    if (checkform) {  // Check if checkform is not undefined
        checkform.addEventListener('submit', checkForm);
    }

    // Check for any shop.html errors
    if (sessionStorage.getItem('error') != null) {
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }
});

// Event functions
/**
 * Check correct data in the entry form
 * @param  {EventObject} event Event triggered on submit
 */
function checkForm(event) {
    console.log("Checking form...");
    // Get values from form fields
    var userName = document.getElementById('userName').value;
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;

    console.log("userName:", userName);
    console.log("userEmail:", userEmail);
    console.log("userPassword:", userPassword);

    // Check changes
    if (!/^[A-Z][a-zA-Z]*$/.test(userName)) {
        event.preventDefault();
        document.getElementById('userName').focus();
        error.innerText = "El campo de Nombre debe comenzar con mayúscula, no puede contener números ni espacios";
        return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es)$/.test(userEmail)) {
        event.preventDefault();
        document.getElementById('email').focus();
        error.innerText = "El correo no puede comenzar con símbolos, debe contener un @, no debe contener espacios y debe finalizar con (Ejemplo = .com, .es)";
        return false;
    }
    if (!/^(?=.*[A-Z])(?=.*\d)[^\s]{5,}$/.test(userPassword)) {
        event.preventDefault();
        document.getElementById('password').focus();
        error.innerText = "La contraseña debe tener al menos 5 caracteres, contener una mayúscula, un número y no puede contener espacios";
        return false;
    }
    
    console.log("After checks...");

    // Information is correct
    userData();
    userHistory();
    return true;
}

/**
 * Load DOM objects, check form, and add events
 */
function loadedDOM() {
    // Capture all elements after DOM has loaded
    img = document.getElementsByClassName('eye-buton').src;
    showHidePassword = document.getElementById('show-hide-password');
    userName = document.getElementById('userName');
    userEmail = document.getElementById('email');
    userPassword = document.getElementById('password');
    error = document.getElementById('error');
    checkform = document.getElementById('formEntry');

    // Check for any shop.html errors
    if(sessionStorage.getItem('error') != null) {
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    // Add submit event to the form
    checkform.addEventListener('submit', checkForm);
}

document.addEventListener('DOMContentLoaded', function() {
    loadedDOM();
    getLocationData();
});
