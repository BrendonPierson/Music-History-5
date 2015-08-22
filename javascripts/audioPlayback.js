define(function(require){
  var audio = document.getElementsByTagName("audio")[0];

  return function(){
    $("[title='Play Track']").click(function() {
      console.log("play clicked");
      audio.play();
    });

    $("[title='Pause Track']").click(function() {
      console.log("pause clicked");
      audio.pause();
    });
  };
});