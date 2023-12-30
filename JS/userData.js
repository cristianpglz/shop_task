/* 
    JS userData
*/

//VARIABLES
var name_input;
var email_input;
var password_input;
var geoLocation;




/**
 * Almacenar los datos en el sessionStorage
 * @param  {HTMLElement} name_input user name
 * @param  {HTMLElement} email user email
 * @param  {HTMLElement} password user password
 */
function datosUsuario(name_input,email_input,password_input) {
    sessionStorage.setItem('name',name_input.value);
    sessionStorage.setItem('email',email_input.value);
    sessionStorage.setItem('password',password_input.value);
    sessionStorage.setItem('geolocalizacion_input',geolocation);
}


/**
 * Recoge los daots de la sesion del sessionStage
 */
function getDatosUsuario(){
    name_input = sessionStorage.getItem('name');
    email_input = sessionStorage.getItem('email');
    password_input = sessionStorage.getItem('password');
}

/**
 * Calcula la geolocalizacion del usuario y la almacena en geolocalizacionTxt
 */
function datoGeolocalizacion(){
    if(!navigator.geolocation){
        geolocation="El navegador no es compatible con API Geolocation";
    }else{
        navigator.geolocation.getCurrentPosition(
            //Exito
            (position)=>{geolocation='Latitud:'+position.coords.latitude+',longitud:'+position.coords.longitude},
            //Error
            ()=>{geolocation="La geolocalizacion no se ha podido realizar";}
        )
    }
}


//localStorage
/**
 * Description
 * @param {any} name_input
 * @param {any} email_input
 * @param {any} password_input
 * @returns {any}
 */
function historicoUsuarios(name_input, email_input, password_input){
    let historyStorage=localStorage.getItem('historico');   
    let history;
    if(historyStorage==null){
        history=[];
    }else{
        history=JSON.parse(historyStorage);
    }
    let registroUsuario={
        usuario:name_input.value,
        email:email_input.value,
        password:password_input.value,
        fecha:Date.now()
    }
    
    history.push(registroUsuario);
    localStorage.setItem('historico',JSON.stringify(history));
}
    




