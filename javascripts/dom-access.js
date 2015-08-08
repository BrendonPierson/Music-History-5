//The dom-access modules should return a reference to the DOM element 
//in your HTML that will contain the song list.
define (["jquery"], function($){
  return {
    win: $(window),
    songsDiv: $("#info"),
    controlsDiv: $("#controls"),
    scrollControlsDiv: $("#scrollControls"),
    nameInput: $('[name="songName"'),
    albumInput: $('[name="album"'),
    artistInput: $('[name="artist"'),
    genreInput: $('[name="genre"'),
    filterButton: $('[value="filter"]'),
    addSongButton: $('[value="addSong"]'),
    genresChecked: $("input:checked")
  };
});
