define (["jquery","hbs", "dom-access"], function($, Handlebars, dom){

return {
//function for turning json into html through handlebars template
    putSongsInHTML: function (data) {
      //populate songs div 
      require(['hbs!../templates/songs'],function(songTemplate){
        dom.songsDiv.hide().html(songTemplate(data)).slideDown("slow");
      });
    }, //end of the json to html function

    populateArtists: function (data) {
      require(['hbs!../templates/artist'],function(artistTemplate){
        // $('select[name="artist"] option[value!="default"').remove();
        $("select[name='artist']:last-child").append(artistTemplate(data));
      });
    },

    populateAlbums: function (data) {
      require(['hbs!../templates/album'],function(albumTemplate){
        // $('select[name="album"] option[value!="default"').remove();
        $("select[name='album']:last-child").append(albumTemplate(data));
      });
    }

  };
});