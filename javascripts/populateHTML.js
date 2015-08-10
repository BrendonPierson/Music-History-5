define (["jquery","hbs", "dom-access"], function($, Handlebars, dom){

return {
//functions for turning json into html through handlebars template
//each takes an object that has an array of the data
    putSongsInHTML: function (data) {
      require(['hbs!../templates/songs'],function(songTemplate){
        dom.songsDiv.hide().html(songTemplate(data)).slideDown("slow");
      });
    }, 
    populateArtists: function (data) {
      require(['hbs!../templates/artist'],function(artistTemplate){
        $("select[name='artist']:last-child").append(artistTemplate(data));
      });
    },
    populateAlbums: function (data) {
      require(['hbs!../templates/album'],function(albumTemplate){
        $("select[name='album']:last-child").append(albumTemplate(data));
      });
    }
  };
});