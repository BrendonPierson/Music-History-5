define(function(require){
      var firebase = require("firebase"),
        auth = require("authentication"),
        user = auth.getUid(),
        ref = new Firebase("https://nssapp.firebaseio.com/positions/" + user),
        Q = require("q");

    var test = require("es6!testMod");
    test();

  return {
    updateOrder: function(newOrder){
    ref.set(newOrder);
    },
    dbOrder: function(songsArr) {
      var deferred = Q.defer();

      var newOrder = [];
      ref.on("value", function(snapshot) {
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