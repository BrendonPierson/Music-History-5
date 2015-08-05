requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
  function($, Handlebars, bootstrap, dom, songs1, songs2) {

    var songs = [];
    var infoHTML = '';
    // var extraSongs = [];
    // var moreInfoHTML = '<div id="moreSongs" class="hidden">';

    function putSongsInHTML(data) {
      for(var i = 0; i < data.length; i++) {
        songs[songs.length] = data[i];
      }
      for (i = 0; i < songs.length; i++) {
        infoHTML +=   "<div class='row song'><h3>" + songs[i].name + "</h3>" + 
                      "<div class='row'><p class='col-sm-4'>Artist: " + songs[i].artist + "</p>" +
                      "<p class='col-sm-4'>On the album: " + songs[i].album + "</p>" + 
                      '<div class="col-sm-4"><button type="button" value="delete" class="btn btn-danger btn-sm">Delete Song</button></div></div></div>';
      } 
      dom.songsDiv.hide("fast").prepend(infoHTML).slideDown("slow");
    }

    // function putMoreSongsInHTML(data) {
    //   for(var i = 0; i < data.length; i ++) {
    //     extraSongs[extraSongs.length] = data[i];
    //   }
    //   for (i = 0; i < extraSongs.length; i++){
    //     moreInfoHTML +=   "<div class='row song'><h3>" + songs[i].name + "</h3>" + 
    //                       "<div class='row'><p class='col-sm-4'>Artist: " + songs[i].artist + "</p>" +
    //                       "<p class='col-sm-4'>On the album: " + songs[i].album + "</p>" + 
    //                       '<div class="col-sm-4"><button type="button" value="delete" class="btn btn-danger btn-sm">Delete Song</button></div></div></div>';
    //   }
    //   moreInfoHTML += '</div>';
    //   dom.songsDiv.prepend(moreInfoHTML);
    //   $("#moreSongs").slideDown("slow");
    // }

    songs1.getSongs(putSongsInHTML);


    $("#addMoreSongs").click(function(){
      infoHTML = '';
      songs2.getSongs(putSongsInHTML);
      $(dom.songsDiv).html(infoHTML);
    });

    $(dom.songsDiv).on('click', "button[value='delete']", function(){
      console.log("clicked delete");
      $(this).parent().parent().parent().remove();
    });


  }

);