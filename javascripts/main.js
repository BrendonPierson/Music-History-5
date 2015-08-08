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
  ["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "responsiveStyles"], 
  function($, _, _firebase, Handlebars, bootstrap, dom, styles) {
    

    //firebase 
    var myFirebaseRef = new Firebase("https://nssapp.firebaseio.com/");

    myFirebaseRef.child("songs").on("value", function(snapshot) {
      //every time the database changes this event fires //

      var songs = snapshot.val(); 
      var songsArr = [];
      var artistsArr = [];
      var albumsArr = [];

      for (var song in songs) {
        songsArr[songsArr.length] = songs[song];
        artistsArr[artistsArr.length] = songs[song].artist;
        albumsArr[albumsArr.length] = songs[song].album;
      }

      var songsObj = {'songs': songsArr};
      
      var uniqueArtists = _.chain(artistsArr).uniq().value();
      var uniqueAlbums = _.chain(albumsArr).uniq().value();

      uniqueArtistsObj = {artists: uniqueArtists};
      uniqueAlbumsObj = {albums: uniqueAlbums};
      // Populate HTML
      populateArtists(uniqueArtistsObj);
      populateAlbums(uniqueAlbumsObj);
      putSongsInHTML(songsObj);
       
      //Filter button Function
      $('[value="filter"]').click(function(){
        //variables to collect filter values 
        var album = $('[name="album"').val();
        var artist = $('[name="artist"').val();
        var $genres = $("input:checked");
        var genres = [];

        //create array of genres from jQuery selector
        for (var i = 0; i < $genres.length; i++){
          genres[genres.length] = $($genres[i]).val();
        }

        var filteredSongsArr = [];
        for(var j = 0; j < songsArr.length; j++) {
          if(songsArr[j].album === album || songsArr[j].artist === artist || genres.indexOf(songsArr[j].genre) !== -1){
            filteredSongsArr[filteredSongsArr.length] = songsArr[j];
          }
        }
        putSongsInHTML({'songs': filteredSongsArr});
      });
    });

    //function for turning json into html through handlebars template
    function putSongsInHTML(data) {
      //populate songs div 
      require(['hbs!../templates/songs', 'hbs!../templates/album', 'hbs!../templates/artist'],function(songTemplate, albumTemplate, artistTemplate){
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


    //Add song Function///
    $('[value="addSong"]').click(function(){
      var newSong = {
        "name": $('[name="songName"').val(),
        "album": $('[name="album"').val(),
        "artist": $('[name="artist"').val(),
        "genre": $('[name="genre"').val()
      };
      $('[name="songName"').val('');
      $('[name="album"').val('');
      $('[name="artist"').val('');
      $('[name="genre"').val('');
      $.ajax({
        url: "https://nssapp.firebaseio.com/songs.json",
        method: "POST",
        data: JSON.stringify(newSong)
      }).done(songs1.getSongs(putSongsInHTML));
    });

    //delete from firebase
    $(dom.songsDiv).on('click', "button[value='delete']", function(){
      $(this).parent().parent().parent().remove();
      console.log("clicked delete");
      var obj = $(this).parent().parent().parent().attr('id');
      console.log(obj);
      $.ajax({
        url: "https://nssapp.firebaseio.com/songs/" + obj + ".json",
        type: 'DELETE'
      });
    });


    // //Fix controls when window is > 767px
    if($(window).width() > 767){
      $("#controls").addClass("affix");
      $("#info").removeClass("col-sm-offset-1").addClass("col-sm-offset-4");
    }

    $(window).resize(function(){
      if($(window).width() > 767){
        $("#controls").addClass("affix");
        $("#info").removeClass("col-sm-offset-1").addClass("col-sm-offset-4");
      } else if ($(window).width() < 767){
        $("#controls").removeClass("affix");
        $("#info").removeClass("col-sm-offset-4").addClass("col-sm-offset-1");
      }
    });

    $(window).on('scroll', function() {
      var y_scroll_pos = window.pageYOffset;
      var scroll_pos_test = 100;            

      if(y_scroll_pos > scroll_pos_test && $("#scrollControls").is(":hidden") && $(window).width() > 767) {
        $("#scrollControls").slideDown("slow");
      } else if (y_scroll_pos < scroll_pos_test && $("#scrollControls").is(":visible")){
        $("#scrollControls").slideUp("fast");
      }
    });
    
  } // end of require js function
); // end of require js scope