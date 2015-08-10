requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'], //makes sure jquery is loaded before bootstrap
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "responsiveStyles", "filter", "editSongs", "populateHTML"], 
  function($, _, _firebase, Handlebars, bootstrap, dom, styles, filter, editSongs, populateHTML) {
    
    //firebase reference
    var myFirebaseRef = new Firebase("https://nssapp.firebaseio.com/");

    myFirebaseRef.child("songs").on("value", function(snapshot) {
      //every time the database changes this event fires //

      //declare variables to hold firebase data
      var songs = snapshot.val(); 
      var songsArr = [];
      var artistsArr = [];
      var albumsArr = [];

      //create arrays of data
      for (var song in songs) {
        songsArr[songsArr.length] = songs[song];
        artistsArr[artistsArr.length] = songs[song].artist;
        albumsArr[albumsArr.length] = songs[song].album;
      }

      var songsObj = {'songs': songs};
      
      var uniqueArtists = _.chain(artistsArr).uniq().value();
      var uniqueAlbums = _.chain(albumsArr).uniq().value();

      uniqueArtistsObj = {artists: uniqueArtists};
      uniqueAlbumsObj = {albums: uniqueAlbums};

      // Populate HTML
      populateHTML.populateArtists(uniqueArtistsObj);
      populateHTML.populateAlbums(uniqueAlbumsObj);
      populateHTML.putSongsInHTML(songsObj);
       
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

    });

    //add Songs
    dom.addSongButton.click(editSongs.addSong);
    //delete songs
    dom.songsDiv.on('click', "button[value='delete']", editSongs.deleteSong);

    // //Fix controls when window is > 767px
    dom.win.resize(styles.resizeCallback);
    dom.win.on('scroll', styles.scrollCallback);
    
  } // end of require js function
); // end of require js scope



