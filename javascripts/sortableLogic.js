define(function(require){
  var $ = require("jquery"),
      jquerySortable = require("jquery-sortable"),
      position = require("update-position");

  return function(songsArr) {
    $("#info").on('mouseover', "#sortable", function(){  
      $("#sortable").sortable({
        placeholder: "ui-state-highlight",
        // opacity: 1,
        revert: true,
        axis: "y",
      });
      $( "#sortable" ).disableSelection();
    });
    
    $("#info").on( "sortupdate", "#sortable", function( event, ui ) {
      var sortedIDs = $("#sortable").sortable("toArray");
      position.updateOrder(sortedIDs);
      var newOrder = [];
      console.log("order of ids", sortedIDs);
      for (var i = 0; i < songsArr.length; i++) {
        var index = _.findIndex(songsArr, 'key', sortedIDs[i]);

        console.log("index", index);
        newOrder[i] = songsArr[index]; 
      }
      console.log("newOrder", newOrder);

    });
  };

});