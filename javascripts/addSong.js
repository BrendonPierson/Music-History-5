var $ = require("jquery"),
    Q = require("q"),
    dom = require("dom-access"),
    auth = "authentication";

// module must retutn a function
export default function (numOfSongs) {
  
  var deferred = Q.defer(); //allows us to control flow of async apllication, more precedural flow like our brain works

  let name = dom.nameInput.val(),
      album = dom.albumInput.val(),
      artist = dom.artistInput.val(),
      genre = dom.genreInput.val(),
      uid = auth.getUid(),
      position = numOfSongs + 1;

  var newSong = {name, album, artist, genre, uid, position};

  dom.nameInput.val('');
  dom.albumInput.val('');
  dom.artistInput.val('');
  dom.genreInput.val('');


  $.ajax({
    url: "https://nssapp.firebaseio.com/songs.json",
    method: "POST",
    data: JSON.stringify(newSong)
  })
    .done(function(songs_data) {
      deferred.resolve(songs_data); //send song data up to .then function we will write in the main
    })
    .fail(function(xhr, status, error){ //original request, status of request, string of error msg
      deferred.reject(error); // send out error if it fails
    });

  return deferred.promise;   
}

