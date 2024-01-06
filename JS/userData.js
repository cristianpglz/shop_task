/* 
    JS userData
*/

/**
 * Almacenar los datos en el sessionStorage
 * @param  {HTMLElement} username user name
 * @param  {HTMLElement} email user email
 * @param  {HTMLElement} password user password
 */
function datosUsuario(username,email,password) {
    sessionStorage.setItem('username',username);
    sessionStorage.setItem('email',email);
    sessionStorage.setItem('password',password);
   
}




/**
 * Recoge los daots de la sesion del sessionStage
 */
function getDatosUsuario(){
    username = sessionStorage.getItem('username');
    email = sessionStorage.getItem('email');
    password = sessionStorage.getItem('password');
}

function comprobacionDatosUsuario(){
    if(typeof username==undefined){
        sessionStorage.setItem('error','No se ha rellenado correctamente el formulario');
        return false;
    }
    console.log("estoy aqui");
    return true;
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
 * @param {any} username
 * @param {any} email
 * @param {any} password
 * @returns {any}
 */
function historicoUsuarios(username, email, password){
    let historyStorage=localStorage.getItem('historico');   
    let history;
    if(historyStorage==null){
        history=[];
    }else{
        history=JSON.parse(historyStorage);
    }
    let registroUsuario={
        usuario:username,
        email:email,
        password:password,
        fecha:Date.now()
    }
    
    history.push(registroUsuario);
    localStorage.setItem('historico',JSON.stringify(history));
}
    



