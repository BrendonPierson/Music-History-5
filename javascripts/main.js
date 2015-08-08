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
  ["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "responsiveStyles", "filter", "editSongs"], 
  function($, _, _firebase, Handlebars, bootstrap, dom, styles, filter, editSongs) {
    
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

      // var songsObj = {'songs': songsArr};
      var songsObj = {'songs': songs};
      
      var uniqueArtists = _.chain(artistsArr).uniq().value();
      var uniqueAlbums = _.chain(albumsArr).uniq().value();

      uniqueArtistsObj = {artists: uniqueArtists};
      uniqueAlbumsObj = {albums: uniqueAlbums};

      // Populate HTML
      populateArtists(uniqueArtistsObj);
      populateAlbums(uniqueAlbumsObj);
      putSongsInHTML(songsObj);
       
      //filter 
      dom.filterButton.click(function(){
        putSongsInHTML(filter.filterSongs(songsArr));
      });

    });

    //function for turning json into html through handlebars template
    function putSongsInHTML(data) {
      //populate songs div 
      require(['hbs!../templates/songs'],function(songTemplate){
        dom.songsDiv.hide().html(songTemplate(data)).slideDown("slow");
      });
    } //end of the json to html function

    function populateArtists(data) {
      require(['hbs!../templates/artist'],function(artistTemplate){
        $("select[name='artist']:last-child").append(artistTemplate(data));
      });
    }

    function populateAlbums(data) {
      require(['hbs!../templates/album'],function(albumTemplate){
        $("select[name='album']:last-child").append(albumTemplate(data));
      });
    }

    //add Songs
    dom.addSongButton.click(editSongs.addSong);
    //delete songs
    dom.songsDiv.on('click', "button[value='delete']", editSongs.deleteSong);


    // //Fix controls when window is > 767px
    dom.win.resize(styles.resizeCallback);
    dom.win.on('scroll', styles.scrollCallback);

    
  } // end of require js function
); // end of require js scope