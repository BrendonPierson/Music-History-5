//The get-more-songs file should contain the AJAX call to your second JSON file 
//with songs in it. This module should return the array of songs.

define (function () {
  var songs = [];

  return {
    ajaxCall: function(){
      $.ajax({
        url: "songs2.json",
        async: false
        }).done(function(data){
          for (var i = 0; i < data.songs.length; i++){
            songs[songs.length] = data.songs[i];     
          }
        });
    },
    getSongs: function(){
      return songs;
    }
  };
});