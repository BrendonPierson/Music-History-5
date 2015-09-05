// var dom = require("es6!dom-access");

import * as $ from "jquery";

export default function(){
    console.log("ecmascript6 is great");
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
}