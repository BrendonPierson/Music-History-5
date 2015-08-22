requirejs(
  ["jquery", "lodash", "firebase", "hbs", "bootstrap",
   "dom-access", "responsiveStyles", "filter", "editSongs", 
   "populateHTML", "addSong", "deleteSong", "jquery-sortable", "authentication", 
   "sortableLogic", "update-position"], 
  function($, _, _firebase, Handlebars, bootstrap, dom, 
            styles, filter, editSongs, populateHTML,
            addSong, deleteSong, jquerySortable, auth, sortableLogic, position) {

    //firebase reference
    var myFirebaseRef = new Firebase("https://nssapp.firebaseio.com/");

    myFirebaseRef.child("songs").orderByChild("uid").equalTo(auth.getUid()).on("value", function(snapshot) {
      //every time the database changes this event fires //

      //declare variables to hold firebase data
      var songs = snapshot.val(); 
      var songsArr = [];
      var artistsArr = [];
      var albumsArr = [];

      //create arrays of data
      for (var song in songs) {
        songs[song].key = song;
        songsArr[songsArr.length] = songs[song];
        //iterate over songsArr and make each position string an int for sorting
        songsArr[songsArr.length - 1].position = parseInt(songsArr[songsArr.length - 1].position);
        artistsArr[artistsArr.length] = songs[song].artist;
        albumsArr[albumsArr.length] = songs[song].album;
      }

      // songsArr = _.sortBy(songsArr, "position");

      // songsArr = position.dbOrder(songsArr);

      var dbOrder = position.dbOrder(songsArr);
      dbOrder
      .then(function(data){

      console.log(" sorted songsArr", data);
      var songsObj = {'songs': data};
      populateHTML.putSongsInHTML(songsObj);
      }).done();

      
      var highestSongIndex = songsArr[songsArr.length - 1];

      // var songsObj = {'songs': songsArr};
      
      var uniqueArtists = _.chain(artistsArr).uniq().value();
      var uniqueAlbums = _.chain(albumsArr).uniq().value();

      uniqueArtistsObj = {artists: uniqueArtists};
      uniqueAlbumsObj = {albums: uniqueAlbums};

      // Populate HTML
      populateHTML.populateArtists(uniqueArtistsObj);
      populateHTML.populateAlbums(uniqueAlbumsObj);
      // populateHTML.putSongsInHTML(songsObj);
      // populateHTML.putSongsInHTML(songsArr);

       // Initialize sortable functionality
      sortableLogic(songsArr);

      //filter clear
      dom.filterButton.click(function(){
        filter.clearFilters(songsObj);
      });

      // filter events, fire every time input is changed, 
      // when on the main page only
      if($(location).attr('pathname') === "/index.html"){
        dom.albumInput.change(function(){
          filter.filterSongs(songsArr);
        });
        dom.artistInput.change(function(){
          filter.filterSongs(songsArr);
        });
        $('[type="checkbox"]').change(function(){
          filter.filterSongs(songsArr);
        });  
      }

       dom.addSongButton.click(function(){
        var songToAdd = addSong(highestSongIndex);

        songToAdd
          .then(function(data){
            console.log("resolved", data);
          })
          .fail(function(err){
            console.log("rejected", err);
          })
          .done();
        });      
    }); // end firebase function

    //add Songs
    // dom.addSongButton.click(editSongs.addSong);
    // dom.addSongButton.click(function(){
    // var songToAdd = addSong();

    // songToAdd
    //   .then(function(data){
    //     console.log("resolved", data);
    //   })
    //   .fail(function(err){
    //     console.log("rejected", err);
    //   })
    //   .done();
    // });

    //delete songs
    // dom.songsDiv.on('click', "button[value='delete']", editSongs.deleteSong);
    dom.songsDiv.on('click', "button[value='delete']", function(){
      var songToDelete = deleteSong($(this).attr('value'));

      songToDelete
        .then(function(data) {
          console.log("resolved", data);
        })
        .fail(function(data){
          console.log("rejected", data);
        })
        .done();

    });


    // //Fix controls when window is > 767px
    dom.win.resize(styles.resizeCallback);
    dom.win.on('scroll', styles.scrollCallback);

 






    
  } // end of require js function
); // end of require js scope