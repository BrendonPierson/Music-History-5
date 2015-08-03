requirejs(
  ["dom-access", "populate-songs", "get-more-songs"], 
  function(dom, songs1, songs2) {

  // console.log("dom: ", dom);
  // console.log("songs1: ", songs1);
  // console.log("songs2: ", songs2);

  
  var songs = [];
  var extraSongs = [];
  var infoHTML1 = '';

  songs1.getSongs(function(data){
    for (var i = 0; i < data.length; i++){
      songs[songs.length] = data[i];  
    }

  songs2.getMoreSongs(function(data){
    for (var i = 0; i < data.length; i++){
      extraSongs[extraSongs.length] = data[i];     
    }
  });

    for (var i = 0; i < songs.length; i++) {
        infoHTML1 +=  "<div class='song'><h3>" + songs[i].name + "</h3>" + 
                      "<p>Artist: " + songs[i].artist + "</p>" +
                      "<p>On the album: " + songs[i].album + "</p>" + 
                      '<button type="button" value="delete">Delete Song</button></div>';
    } 
  
    dom.songsDiv.prepend(infoHTML1);



    var infoHTML2 = infoHTML1;

  $("#addMoreSongs").click(function(){
    for (var i = 0; i < extraSongs.length; i++) {
      infoHTML2 +=  "<div class='song'><h3>" + extraSongs[i].name + "</h3>" + 
                    "<p>Artist: " + extraSongs[i].artist + "</p>" +
                    "<p>On the album: " + extraSongs[i].album + "</p>" + 
                    '<button type="button" value="delete">Delete Song</button></div>';
    }
    $("#info").html(infoHTML2);
  });

  $("#info").on('click', "button[value='delete']", function(){
      console.log("clicked delete");
      $(this).parent().remove();
    });
  });
});


 