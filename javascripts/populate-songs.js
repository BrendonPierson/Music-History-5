//The populate-songs file should contain the AJAX call 
//to your first JSON file with songs in it. 
//This module should return the array of songs.

define (["jquery"], function ($) {
  return {
    getSongs: function(callback){
      $.ajax({
        url: "songs.json"
      }).done(function(data){
        callback.call(this, data.songs);
      });
    }
  };
});
