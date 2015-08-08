define (["jquery", "dom-access"], function($, dom){
  return {
   scrollCallback: function() {

      if(dom.win.width() > 767) {
        $("#controls").addClass("affix").fadeIn("slow");
        $("#info").removeClass("col-sm-offset-1").addClass("col-sm-offset-4");
      }

      var y_scroll_pos = window.pageYOffset;
      var scroll_pos_test = 100;            

      if(y_scroll_pos > scroll_pos_test && $("#scrollControls").is(":hidden") && dom.win.width() > 767) {
        $("#scrollControls").slideDown("slow");
      } else if (y_scroll_pos < scroll_pos_test && $("#scrollControls").is(":visible")){
        $("#scrollControls").slideUp("fast");
      }

      if(y_scroll_pos < scroll_pos_test) {
        $("#controls").removeClass("affix");
        $("#info").removeClass("col-sm-offset-4").addClass("col-sm-offset-1");
      }

    },
    resizeCallback: function(){
      if(dom.win.width() > 767){
        $("#controls").addClass("affix");
        $("#info").removeClass("col-sm-offset-1").addClass("col-sm-offset-4");
      } else if (dom.win.width() < 767){
        $("#controls").removeClass("affix");
        $("#info").removeClass("col-sm-offset-4").addClass("col-sm-offset-1");
      }
    }

  };
});


