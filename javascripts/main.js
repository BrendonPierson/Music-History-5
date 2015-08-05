requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'] //makes sure jquery is loaded before bootstrap
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
  function($, Handlebars, bootstrap, dom, songs1, songs2) {

    //function for turning json file into html
    function putSongsInHTML(data) {
      require(['hbs!../templates/songs'],function(songTemplate){
        dom.songsDiv.hide("fast").prepend(songTemplate(data)).slideDown("slow");
      });
    }
    //populate songs list
    songs1.getSongs(putSongsInHTML);

    //more sounds button click event handler, hides button when songs are added
    dom.moreSongs.click(function(){
      songs2.getSongs(putSongsInHTML);
      $(this).hide();
    });

    //handle delete button click
    $(dom.songsDiv).on('click', "button[value='delete']", function(){
      console.log("clicked delete");
      $(this).parent().parent().parent().remove();
    });

    //Fix controls when window is > 767
    if($(window).width() > 767){
      $("#controls").addClass("affix");
      $("#info").removeClass("col-sm-offset-1").addClass("col-sm-offset-4");
    }

    $( window ).resize(function(){
      if($(window).width() > 767){
        $("#controls").addClass("affix");
        $("#info").removeClass("col-sm-offset-1").addClass("col-sm-offset-4");
      } else if ($(window).width() < 767){
        $("#controls").removeClass("affix");
        $("#info").removeClass("col-sm-offset-4").addClass("col-sm-offset-1");
      }
    });
    
  } // end of require js function
); // end of require js scope