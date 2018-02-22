// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCzHOTVL6o_iXOG4FcHu7l1Z-ryAspmVzo',
  authDomain: 'conciertos-f4603.firebaseapp.com',
  databaseURL: 'https://conciertos-f4603.firebaseio.com',
  projectId: 'conciertos-f4603',
  storageBucket: 'conciertos-f4603.appspot.com',
  messagingSenderId: '138757723689'
};
firebase.initializeApp(config);

// Cierre de sesión:
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

/* ===== AUTENTICACION FIREBASE ===== */
// Registro con correo:
$('#id').click(function() {
  var newName = $('#newName').val();
  var newEmail = $('#newEmail').val();
  var newPassword = $('#newPassword').val();

  firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}); 

// Log in con correo:
function signIn() {
  var email = $('#email').val();
  var password = $('#password').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      console.log('Ingreso exitoso!');
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

// Oservador de estado:
function watcher() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('Usuario activo!');
      console.log(user);
      $('#eventos').show();
      $('#loginGoogle').hide();
      $('#loginFacebook').hide();
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      $('#videoCover').show();
      $('#catchPhrase').show();
      $('#btnProfileUser').hide();
      $('#logInBtn').show();
      console.log('No hay usuario activo!');
    }
  });
}
watcher();

// AUTENTICACION CON FACEBOOK:
var provider = new firebase.auth.FacebookAuthProvider();
$('#loginFacebook').click(function() {
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    console.log('autenticado usuario', result.user);
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    console.log('Detectado un error:', error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
});

$(document).ready(function() {
  $('.button-collapse').sideNav(); // Versión móvil navbar
  $('.modal').modal(); // Modal search
  $('.slider').slider(); // Slider
  $('.parallax').parallax(); // Parallax

  // Splash
  $(function () {
    setTimeout(function () {
      $('#splash').fadeOut(500);
    }, 2000);
  });
});

/* API EVENTFUL
* http://api.eventful.com/json/events/search?app_key=tfgSKd7Mf8bWjvmg&location=San+Diego
* Métodos: 
* Búsqueda por eventos: /events/search
* Búsqueda por local: /venues/search
* Marks a user as "I'm going" to an event. /users/going/add o /users/going/remove
* Search for performers. /performers/search
* Get all events for a performer /performers/events/list
* List the available categories. /categories/list
*/

const appKey = 'tfgSKd7Mf8bWjvmg';
let title = '';
let city = '';
let country = '';
let venue = '';
let keyword = `&keyword=${$('#keyword').val()}`; 
let thumbnail = '';
// categories/music?geo=country_id:44
// https://api.eventful.com/json/events/search?app_key=${appKey}&scheme=https&location=Chile&category=music

fetch(`https://api.eventful.com/json/events/search?app_key=${appKey}&scheme=https&location=Chile&category=music`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data);
    $.each(data.events, function(i, item) {
      console.log(item);
      for (x in item) {
        console.log(item[x]);
        title = item[x].title; // Título del evento
        city = item[x].city_name; // Ciudad del evento
        country = item[x].country_name; // País
        venue = item[x].venue_name; // Lugar del evento
        // Thumbnail:
        $.getJSON(`https://api.cognitive.microsoft.com/bing/v7.0/images?q=depeche+mode&access_key=1f41e5c9b6f04e98bb3fff33054dc268&`);

        $('#display').append(`
          <li>
            <div class="event" background-image="url(${thumbnail})" width="100" height="100">
              <h2 class="evThumb title">${title}</h2>
              <h4 class="evThumb">${venue}</h4>
              <h5 class="evThumb">${city}, ${country}</h5>
            </div>  
          </li>`);
      }
    });
  });