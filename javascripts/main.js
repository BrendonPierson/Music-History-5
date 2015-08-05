requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
  function($, Handlebars, bootstrap, dom, songs1, songs2) {

    function putSongsInHTML(data) {
      require(['hbs!../templates/songs'],function(songTemplate){
        dom.songsDiv.hide("fast").prepend(songTemplate(data)).slideDown("slow");
      });
    }

    songs1.getSongs(putSongsInHTML);

    dom.moreSongs.click(function(){
      songs2.getSongs(putSongsInHTML);
    });

    $(dom.songsDiv).on('click', "button[value='delete']", function(){
      console.log("clicked delete");
      $(this).parent().parent().parent().remove();
    });
  }
);