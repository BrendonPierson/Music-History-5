//The dom-access modules should return a reference to the DOM element 
//in your HTML that will contain the song list.
define (["jquery"], function($){
  return {
    songsDiv: $("#info"),
    moreSongs: $("#addMoreSongs")
  };
});
