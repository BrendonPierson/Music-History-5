define (["jquery", "dom-access", "populateHTML", "lodash"], function($, dom, populateHTML, _){
  return {
    filterSongs: function(songsArr){
      console.log("filter function fired");
      //variables to collect filter values 
      var album = dom.albumInput.val();
      var artist = dom.artistInput.val();
      var $genres = $("input:checked");
      var genres = [];
      var filteredSongsArr = [];
      var deleteCount = 0;
      var songsArrCopy = songsArr.slice();
      var artistsArr = [];
      var albumsArr = [];

      //create array of genres from jQuery selector
      for (var i = 0; i < $genres.length; i++){
        genres[genres.length] = $($genres[i]).val();
      }

      //test each song to see if they match the filters, 
      //if they don't match they are removed and not displayed
      for(var j = 0; j < songsArrCopy.length; j++) {
        if(songsArrCopy[j].album !== album && album !== "default") {
          songsArrCopy[j] = '';
        } else if (songsArrCopy[j].artist !== artist && artist !== "default") {
          songsArrCopy[j] = '';
        } else if (genres.indexOf(songsArrCopy[j].genre) === -1 && genres.length > 0){
          songsArrCopy[j] = '';
        } 
        if(songsArrCopy[j] !== '') {
          filteredSongsArr[filteredSongsArr.length] = songsArrCopy[j];
        }
      }

      //create new arrays of albums and artists to populate drop downs
      for(var k = 0; k < filteredSongsArr.length; k++) {
        artistsArr[artistsArr.length] = filteredSongsArr[k].artist;
        albumsArr[albumsArr.length] = filteredSongsArr[k].album;
      }
      //filter out any duplicates from artists and album arrays
      var uniqueArtists = _.chain(artistsArr).uniq().value();
      var uniqueAlbums = _.chain(albumsArr).uniq().value();

      //remove the current drop down options
      $("select option[value!='default']").remove();

      //turn arrays into objects for hbs templates
      var uniqueArtistsObj = {artists: uniqueArtists};
      var uniqueAlbumsObj = {albums: uniqueAlbums};

      // execute functions to populate html with the new filters
      populateHTML.populateArtists(uniqueArtistsObj);
      populateHTML.populateAlbums(uniqueAlbumsObj);
      populateHTML.putSongsInHTML({'songs': filteredSongsArr});
    },
    clearFilters: function(songsObj){
      populateHTML.putSongsInHTML(songsObj);
      populateHTML.populateArtists(uniqueArtistsObj);
      populateHTML.populateAlbums(uniqueAlbumsObj);
      $('input:checkbox').removeAttr('checked');
    }


  };
});