define(function(require){
  var audio = document.getElementsByTagName("audio")[0];

  return function(){
    $("[title='Play Track']").click(function() {
      console.log("play clicked");
      console.log("audio source", $("#sortable:first-child").attr('value'));
      audio.src = $("#sortable li:first-child").attr('value');
      audio.play();
    });

    $("[title='Pause Track']").click(function() {
      console.log("pause clicked");
      audio.pause();
    });
  };
});