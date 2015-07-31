//The populate-songs file should contain the AJAX call 
//to your first JSON file with songs in it. 
//This module should return the array of songs.

define (function () {
  var songs = [];
  
  return {
    ajaxCall: function(){
      $.ajax({
        url: "songs.json"
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
