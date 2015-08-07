requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'] //makes sure jquery is loaded before bootstrap
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
  function($, Handlebars, bootstrap, dom, songs1, songs2) {
    
    //create object to hold data from ajax call
    var songsObj; //don't edit
    var songsData; //can edit

    //function for turning json file into html
    function putSongsInHTML(data) {
      songsObj = data;
      songsData = songsObj;
      //populate songs div and form artist/album drop downs
      require(['hbs!../templates/songs', 'hbs!../templates/album', 'hbs!../templates/artist'],function(songTemplate, albumTemplate, artistTemplate){
        dom.songsDiv.hide().html(songTemplate(data)).slideDown("slow");
        $("select[name='album']:last-child").append(albumTemplate(data));
        $("select[name='artist']:last-child").append(artistTemplate(data));
      });
    } //end of the json to html function

    //function for filtering songs and putting them in the DOM
    function filterSongsInHTML(data) {
      console.log("filterSongsIntHTML function running on this data: ", data);
      require(['hbs!../templates/songs'],function(songTemplate){
        dom.songsDiv.hide().html(songTemplate(data)).slideDown("slow");
      });
    }


    //populate songs list
    songs1.getSongs(putSongsInHTML);


    //Add song Function///
    $('[value="addSong"]').click(function(){
      var newSong = {
        "name": $('[name="songName"').val(),
        "album": $('[name="album"').val(),
        "artist": $('[name="artist"').val()
      };
      $.ajax({
        url: "https://nssapp.firebaseio.com/songs.json",
        method: "POST",
        data: JSON.stringify(newSong)
      }).done(songs1.getSongs(putSongsInHTML));
    });

    //Filter button Function
    $('[value="filter"]').click(function(){
      //collect filter values 
      var album = $('[name="album"').val();
      var artist = $('[name="artist"').val();
      
      var $genres = $("input:checked");
      var genres = [];

      //create array of genres
      for (var i = 0; i < $genres.length; i++){
        genres[genres.length] = $($genres[i]).val();
      }
      console.log("Genres checked: ", genres);


      for (var obj in songsData.songs) {
        if (songsData.songs[obj].album !== album && songsData.songs[obj].artist !== artist && genres.indexOf(songsData.songs[obj].genre) === -1){
          delete songsData.songs[obj];
        } //else if (genres.length < 0 && genres.indexOf(songsData.songs[obj].genre) === -1) {
          //delete songsData.songs[obj];
        }
      
      console.log("songsData: ", songsData);
      console.log("songsObj", songsObj);
      filterSongsInHTML(songsData);
    });

   

    //handle delete button click
    $(dom.songsDiv).on('click', "button[value='delete']", function(){
      console.log("clicked delete");
      $(this).parent().parent().parent().remove();
    });

    //Fix controls when window is > 767///////////////////
    if($(window).width() > 767){
      $("#controls").addClass("affix");
      $("#info").removeClass("col-sm-offset-1").addClass("col-sm-offset-4");
    }

    $( window ).resize(function(){
      if($(window).width() > 767){
        $("#controls").addClass("affix");
        $("#info").removeClass("col-sm-offset-1").addClass("col-sm-offset-4");
      } else if ($(window).width() < 767){
        $("#controls").removeClass("affix");
        $("#info").removeClass("col-sm-offset-4").addClass("col-sm-offset-1");
      }
    });
    
  } // end of require js function
); // end of require js scope