define (["jquery", "dom-access"], function($, dom){
  return {
    filterSongs: function(songsArr){
        //variables to collect filter values 
        var album = dom.albumInput.val();
        var artist = dom.artistInput.val();
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
        return {'songs': filteredSongsArr};
      }
  };
});