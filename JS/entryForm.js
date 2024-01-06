/* 
    JS EntryForm
*/

//VARIABLES
var img;
var showHidePassword;
var username;
var email;
var password;
var error;
var checkform;
//load DOM content, variables and dependencies
password = document.getElementById('password');
img = document.getElementsByClassName('eye-buton').src;
showHidePassword = document.getElementById('show-hide-password');
username = document.getElementById('username');
email = document.getElementById('email');
checkform = document.getElementById('formEntry');


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

    
    //Funciones de evento
    /**
     * Comprueba los datos correctos del formualrio de entrada
     * @param  {EventObject} event Evento que salta al realizar submit
     */
    checkform.addEventListener('submit', function comprobarForm(event){
        //Comprobar cambios
        if (!/^[A-Z][a-zA-Z]*$/.test(username.value))
        {
            event.preventDefault(); // Asegúrate de que esta línea esté aquí
            username.focus();
            error.innerText = "El campo de Nombre debe comenzar con Mayuscula, no puede contener números ni espacios";
            return false;
        }
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es)$/.test(email.value)){
            event.preventDefault(); // Asegúrate de que esta línea esté aquí
            email.focus();
            error.innerText = "El correo no puede comenzar con simbolos, debe contener un @, no debe contener Espacios y debe Finalizar con (Ejemplo = .com , .es)";
            return false;
        }
        if(!/^(?=.*[A-Z])(?=.*\d)[^\s]{5,}$/.test(password.value)){
            event.preventDefault(); // Asegúrate de que esta línea esté aquí
            password.focus();
            error.innerText = "La contraseña debe contener un minimo de 5 caracteres, una Mayuscula, un Numero y no debe contener Espacios";
            return false;
        }
        
        
        //Informacion es correcta
        userData(username,email,password);
        historicoUsuarios(username,email,password);
        return true;
    }
    )
    /**
     * Carga de objetos del DOM comprobaciones y eventos del formulario
     */
    function domCargado(){
        //Captura de todos los Elements
        username=document.getElementById("username").value;
        email=document.getElementById("email").value;
        formEntry=document.getElementById("formEntry");
        error=document.getElementById("error");
    
        //Comprobar si hay algún error de shop.html
        if(sessionStorage.getItem('error')!=null || undefined)
        {
            error.innerText=sessionStorage.getItem('error');
            sessionStorage.removeItem('error');
        }

    }
    
    
    //Inicio de carga de eventos
    document.addEventListener('DOMContentLoaded',domCargado);
    //Geolocalizacion
    datoGeolocalizacion();
    