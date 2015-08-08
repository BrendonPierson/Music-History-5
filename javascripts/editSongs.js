define (["jquery", "dom-access"], function($, dom){
  return {
    addSong: function(){
      var newSong = {
        "name": dom.nameInput.val(),
        "album": dom.albumInput.val(),
        "artist": dom.artistInput.val(),
        "genre": dom.genreInput.val()
      };
      dom.nameInput.val('');
      dom.albumInput.val('');
      dom.artistInput.val('');
      dom.genreInput.val('');
      $.ajax({
        url: "https://nssapp.firebaseio.com/songs.json",
        method: "POST",
        data: JSON.stringify(newSong)
      });
    },
    deleteSong: function(){
        $.ajax({
        url: "https://nssapp.firebaseio.com/songs/" + $(this).parent().parent().parent().attr('id') + ".json",
        type: 'DELETE'
      });
    }
  };
});