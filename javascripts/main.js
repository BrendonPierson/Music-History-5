requirejs(
  ["dom-access", "populate-songs", "get-more-songs"], 
  function(dom, songs1, songs2) {
  console.log("dom: ", dom);
  console.log("songs1: ", songs1);
  console.log("songs2: ", songs2);

songs1.ajaxCall();
songs2.ajaxCall();
songs1.getSongs();

  console.log("songs1 drilled down: ", songs1.getSongs());
  var songs = songs1.getSongs();
  var extraSongs = songs2.getSongs();
  var infoHTML1 = "";
  
  for (var i = 0; i < songs.length; i++) {
  	infoHTML1 +=  "<div class='song'><h3>" + songs[i].name + "</h3>" + 
	  							"<p>Artist: " + songs[i].artist + "</p>" +
	  							"<p>On the album: " + songs[i].album + "</p>" + 
	  							'<button type="button" value="delete">Delete Song</button></div>';
  } 
  
  console.log("infoHTML1", infoHTML1);
  console.log(dom.songsDiv);
  dom.songsDiv.prepend(infoHTML1);

  var infoHTML2 = infoHTML1;

  $("#addMoreSongs").click(function(){
  	for (var i = 0; i < extraSongs.length; i++) {
	  	infoHTML2 +=  "<div class='song'><h3>" + extraSongs[i].name + "</h3>" + 
		  							"<p>Artist: " + extraSongs[i].artist + "</p>" +
		  							"<p>On the album: " + extraSongs[i].album + "</p>" + 
		  							'<button type="button" value="delete">Delete Song</button></div>';
	  }
	  $("#info").html(infoHTML2);
  });

  $("#info").on('click', "button[value='delete']", function(){
			console.log("clicked delete");
			$(this).parent().remove();
		});
  }
);




// $(document).ready(function() { 
// 	var info1HTML = "";
// 	var info2HTML = "";
//   $.ajax({
//     url: "songs.json"
// 	  }).done(function(data){
// 	    for (var i = 0; i < data.songs.length; i++){
// 	    	info1HTML += "<div class='song'><h3>" + data.songs[i].name + "</h3>" + 
// 	    							"<p>Artist: " + data.songs[i].artist + "</p>" +
// 	    							"<p>On the album: " + data.songs[i].album + "</p>" + 
// 	    							'<button type="button" value="delete">Delete Song</button></div>';					
// 	    }
// 	    $("#info").prepend(info1HTML);
// 	  });

// 	  $("#addMoreSongs").click(function(){
// 	    	console.log("clicked");
// 	    	$.ajax({
//     			url: "songs2.json"
// 	  		}).done(function(data){
// 	  			console.log(data.songs.length);
// 	    		for (var i = 0; i < data.songs.length; i++){
// 	    		info2HTML += info1HTML + "<div class='song'><h3>" + data.songs[i].name + "</h3>" + 
// 	    								"<p>Artist: " + data.songs[i].artist + "</p>" +
// 	    								"<p>On the album: " + data.songs[i].album + "</p>" + 
// 	    								'<button type="button" value="delete">Delete Song</button></div>';
// 	   		  }
// 	    $("#info").html(info2HTML);
// 	    });
// 		});
// 		$("#info").on('click', "button[value='delete']", function(){
// 			console.log("clicked delete");
// 			$(this).parent().remove();
// 		});
//   });

// // $( "#dataTable tbody" ).on( "click", "tr", function() {
// //   console.log( $( this ).text() );
// // });






