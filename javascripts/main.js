requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../bower_components/q/q',
    'jquery-sortable': '../bower_components/jquery-ui/jquery-ui',
    'es6': '../bower_components/requirejs-babel/es6',
    'babel': '../bower_components/requirejs-babel/babel-5.8.22.min'
  },
  shim: {
    'bootstrap': ['jquery'], //makes sure jquery is loaded before bootstrap
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["firebase", "bootstrap", "authentication"], 
  function(_firebase, bootstrap, auth) {

    /////// user authentication
    //detect if user is already logged in
    var ref = new Firebase("https://nssapp.firebaseio.com");
    var authData = ref.getAuth();
    console.log("authData: ", authData);
    //if no login, authenticate with Github OAuth
    if(authData === null) {
      ref.authWithOAuthPopup("github", function(error, authData) { //1.firebase sends request for request token to github with client id and secret id
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          auth.setUid(authData.uid);
          require(["main-logic"], function() {});
        }
      });
    } else {
      auth.setUid(authData.uid);
      require(["main-logic"], function() {});
    }

  } // end of require js function
); // end of require js scope

// ecma6 syntax export instead of return from module
// import * as firebase from "firebase";
// import * as _ from "lodash";

// export default function(){
//   return {...}
// }

