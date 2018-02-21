// Initialize Firebase
var config = {
  apiKey: "AIzaSyCzHOTVL6o_iXOG4FcHu7l1Z-ryAspmVzo",
  authDomain: "conciertos-f4603.firebaseapp.com",
  databaseURL: "https://conciertos-f4603.firebaseio.com",
  projectId: "conciertos-f4603",
  storageBucket: "conciertos-f4603.appspot.com",
  messagingSenderId: "138757723689"
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
function signUp() {
  var newUserName = $('#newUserName').val();
  var newName = $('#newName').val();
  var newLastName = $('#newLastName').val();
  var newUserName = $('#newUserName').val();
  var newEmail = $('#newEmail').val();
  var newPassword = $('#newPassword').val();

  firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

// Log in con correo:
function signIn() {

  var email = $('#email').val();
  var password = $('#password').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // console.log('Ingreso exitoso!');
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
      $('#home').show();
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

// AUTENTICACION CON GOOGLE;
var provider = new firebase.auth.GoogleAuthProvider();
$('#loginGoogle').click(function() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log('autenticado usuario ', result.user);
    // This gives you a Google Access Token. You can use it to access the Google API.
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

// AUTENTICACION CON FACEBOOK:
var provider = new firebase.auth.FacebookAuthProvider();
$('#loginfacebook').click(function() {
  firebase.auth().signInWithRedirect(provider).then(function(result) {
    console.log('autenticado usuario ', result.user);
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

fetch(`http://api.eventful.com/json/events/search?app_key=${appKey}&location=Chile&category=music`)
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
        venue = item[x].venue_name // Lugar del evento
        $('#display').append(`
          <li>
            <h2>${title}</h2>
            <h4>${venue}</h4>
            <h5>${city}, ${country}</h5>
          </li>`);
      }
    });
  });