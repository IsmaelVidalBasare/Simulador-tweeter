//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets'); 
let tweets = []; 


//Event Listeners
eventListeners(); 

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet); 

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; 

        console.log(tweets); 

        crearHtml(); 
    }); 
}


//Funciones
function agregarTweet(e){
    e.preventDefault();

    //Textarea donde el usuario escribe el mensaje
    const tweet = document.querySelector('#tweet').value; 

    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio'); 

        return; //evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //añadir al arreglo de mensajes 
    tweets = [...tweets, tweetObj];

    //una vez agregado, creamos el html
    crearHtml(); 


}

//mostrar mensaje de error 
function mostrarError(error){
    const mensajeError = document.createElement('p'); 
    mensajeError.textContent = error;
    mensajeError.classList.add('error'); 

    //Insermos el mensaje de error en el contenido
    const contenido = document.querySelector('#contenido'); 
    contenido.appendChild(mensajeError); 

    //Elimina la alerta despues de 3 segundos 
    setTimeout(() => {
        mensajeError.remove();
    }, 3000); 
}


//muestra un listado de los tweets, mensajes
function crearHtml() {

    limpiarHTML()

    if(tweets.length > 0 ){
        tweets.forEach(tweet => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a'); 
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X'; 

            //añadir la funcion de eliminar el mensaje 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id); 
            }

             //crear el html
             const li = document.createElement('li'); 

             //añadimosel texto
             li.innerText = tweet.tweet; 

             //asignamos el boton
             li.appendChild(btnEliminar); 

             //insertado en el Html
             listaTweets.appendChild(li); 
        });
    }
    sincronizarStorage();
}

//Agregamos los tweets actuales a localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets)); 
}


//Eliminar un tweeet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id); 

    crearHtml(); 

}

//limpiar el html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild); 
    }
}