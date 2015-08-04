requirejs(
  ["dom-access", "populate-songs", "get-more-songs"], 
  function(dom, songs1, songs2) {

    var songs = [];
    var extraSongs = [];
    var infoHTML = '';

    function putSongsInHTML(data) {
      for(var i = 0; i < data.length; i++) {
        songs[songs.length] = data[i];
      }
      for (i = 0; i < songs.length; i++) {
        infoHTML +=   "<div class='row song'><h3>" + songs[i].name + "</h3>" + 
                      "<div class='row'><p class='col-sm-4'>Artist: " + songs[i].artist + "</p>" +
                      "<p class='col-sm-4'>On the album: " + songs[i].album + "</p>" + 
                      '<div class="col-sm-4"><button type="button" value="delete" class="btn btn-danger btn-xs">Delete Song</button></div></div></div>';
      } 
      dom.songsDiv.prepend(infoHTML);
    }
    songs1.getSongs(putSongsInHTML);

    $("#addMoreSongs").click(function(){
      infoHTML = '';
      songs2.getSongs(putSongsInHTML);
       $("#info").html(infoHTML);
    });

    $("#info").on('click', "button[value='delete']", function(){
      console.log("clicked delete");
      $(this).parent().parent().parent().remove();
    });

  }
);