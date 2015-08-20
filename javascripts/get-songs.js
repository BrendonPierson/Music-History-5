define(["jquery", "q"], function($, Q){

  // module must reutn a function
  return function () {
    
    var deferred = Q.defer(); //allows us to control flow of async apllication, more precedural flow like our brain works

    $.ajax({
      url: "./javascripts/songs.json"
    })
    .done(function(songs_data) {
      deferred.resolve(songs_data); //send song data up to .then function we will write in the main
    })
    .fail(function(xhr, status, error){ //original request, status of request, string of error msg
      deferred.reject(error); // send out error if it fails
    });

    return deferred.promise;   
  };

});