/* 
    JS EntryForm
*/

//VARIABLES
var password;
var img;
var showHidePassword;


//load DOM content, variables and dependencies
password = document.getElementById('password');
img = document.getElementsByClassName('eye-buton').src;
showHidePassword = document.getElementById('show-hide-password');

//Check Password
showHidePassword.onclick = function() {
        if (password.type == "password") {
            password.type = "text";
            showHidePassword.innerHTML = '<img class="eye-buton" src="./IMGs/eye-check.png" width="30px" alt="">';
        }
        else {
            password.type = "password";
            showHidePassword.innerHTML = '<img class="eye-buton" src="/IMGs/dont check.png" width="25px" alt="">';
        }
    } 

