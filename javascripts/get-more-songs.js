//The get-more-songs file should contain the AJAX call to your second JSON file 
//with songs in it. This module should return the array of songs.

define (function () {
  return {
    getMoreSongs: function(callback){
      $.ajax({
        url: "songs2.json"
        }).done(function(data){
          callback.call(this, data.songs);
        });
    }
  };
});