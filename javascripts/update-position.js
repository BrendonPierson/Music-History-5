define(function(require){
      var firebase = require("firebase"),
        auth = require("authentication"),
        user = auth.getUid(),
        ref = new Firebase("https://nssapp.firebaseio.com/positions/" + user),
        Q = require("q");

  return {
    updateOrder: function(newOrder){
    ref.update({newOrder});
    },
    dbOrder: function(songsArr) {
      var deferred = Q.defer();

      var newOrder = [];
      ref.child("newOrder").on("value", function(snapshot) {
        var sortedIDs = snapshot.val();
        console.log("order of ids", sortedIDs);
        for (var i = 0; i < songsArr.length; i++) {
          var index = _.findIndex(songsArr, 'key', sortedIDs[i]);
          newOrder[i] = songsArr[index]; 
        }
        console.log("new order func", newOrder);
        deferred.resolve(newOrder);
      });
      
      return deferred.promise;  

    }
  };
});