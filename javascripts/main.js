requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../bower_components/q/q',
    'jquery-sortable': '../bower_components/jquery-ui/jquery-ui'
  },
  shim: {
    'bootstrap': ['jquery'], //makes sure jquery is loaded before bootstrap
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["jquery", "lodash", "firebase", "hbs", "bootstrap",
   "dom-access", "responsiveStyles", "filter", "editSongs", 
   "populateHTML", "addSong", "deleteSong", "jquery-sortable", "authentication"], 
  function($, _, _firebase, Handlebars, bootstrap, dom, 
            styles, filter, editSongs, populateHTML,
            addSong, deleteSong, jquerySortable, auth) {

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
          // require(["core_list"], function() {});
        }
      });
    } else {
      auth.setUid(authData.uid);
      // require(["core_list"], function() {});
    }

////////////////////////////



    //firebase reference
    var myFirebaseRef = new Firebase("https://nssapp.firebaseio.com/");

    myFirebaseRef.child("songs").orderByChild("uid").equalTo(auth.getUid()).on("value", function(snapshot) {
      //every time the database changes this event fires //

      //declare variables to hold firebase data
      var songs = snapshot.val(); 
      var songsArr = [];
      var artistsArr = [];
      var albumsArr = [];

      //create arrays of data
      for (var song in songs) {
        songs[song].key = song;
        songsArr[songsArr.length] = songs[song];
        artistsArr[artistsArr.length] = songs[song].artist;
        albumsArr[albumsArr.length] = songs[song].album;
      }

      songsArr = _.sortBy(songsArr, "position");
      console.log("songsArr", songsArr);
      
      var numOfSongs = songsArr.length;

      console.log("numOfSongs", numOfSongs);

      var songsObj = {'songs': songsArr};
      
      var uniqueArtists = _.chain(artistsArr).uniq().value();
      var uniqueAlbums = _.chain(albumsArr).uniq().value();

      uniqueArtistsObj = {artists: uniqueArtists};
      uniqueAlbumsObj = {albums: uniqueAlbums};

      // Populate HTML
      populateHTML.populateArtists(uniqueArtistsObj);
      populateHTML.populateAlbums(uniqueAlbumsObj);
      populateHTML.putSongsInHTML(songsObj);
      // populateHTML.putSongsInHTML(songsArr);


      //filter clear
      dom.filterButton.click(function(){
        filter.clearFilters(songsObj);
      });

      //filter events, fire every time input is changed, when on the main page only
      if($(location).attr('pathname') === "/index.html"){
        dom.albumInput.change(function(){
          filter.filterSongs(songsArr);
        });
        dom.artistInput.change(function(){
          filter.filterSongs(songsArr);
        });
        $('[type="checkbox"]').change(function(){
          filter.filterSongs(songsArr);
        });  
      }

       dom.addSongButton.click(function(){
        var songToAdd = addSong(numOfSongs);

        songToAdd
          .then(function(data){
            console.log("resolved", data);
          })
          .fail(function(err){
            console.log("rejected", err);
          })
          .done();
        });      
    });

    //add Songs
    // dom.addSongButton.click(editSongs.addSong);
    // dom.addSongButton.click(function(){
    // var songToAdd = addSong();

    // songToAdd
    //   .then(function(data){
    //     console.log("resolved", data);
    //   })
    //   .fail(function(err){
    //     console.log("rejected", err);
    //   })
    //   .done();
    // });

    //delete songs
    // dom.songsDiv.on('click', "button[value='delete']", editSongs.deleteSong);
    dom.songsDiv.on('click', "button[value='delete']", function(){
      var songToDelete = deleteSong($(this).attr('value'));

      songToDelete
        .then(function(data) {
          console.log("resolved", data);
        })
        .fail(function(data){
          console.log("rejected", data);
        })
        .done();

    });


    // //Fix controls when window is > 767px
    dom.win.resize(styles.resizeCallback);
    dom.win.on('scroll', styles.scrollCallback);

////// Sortable test //////////////////

  $("#info").on('mouseover', "#sortable", function(){  
    $("#sortable").sortable({
      placeholder: "ui-state-highlight",
      // opacity: 1,
      revert: true,
      axis: "y"
    });
    $( "#sortable" ).disableSelection();
  });
$("#info").on( "sortchange", "#sortable", function( event, ui ) {
  var sortedIDs = $("#sortable").sortable("toArray");
  console.log(sortedIDs);
});


////////////////////////////////////





    
  } // end of require js function
); // end of require js scope



