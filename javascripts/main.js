$(document).ready(function() { 
	var info1HTML = "";
	var info2HTML = "";
  $.ajax({
    url: "songs.json"
	  }).done(function(data){
	    for (var i = 0; i < data.songs.length; i++){
	    	info1HTML += "<div class='song'><h3>" + data.songs[i].name + "</h3>" + 
	    							"<p>Artist: " + data.songs[i].artist + "</p>" +
	    							"<p>On the album: " + data.songs[i].album + "</p>" + 
	    							'<button type="button" value="delete">Delete Song</button></div>';					
	    }
	    $("#info").prepend(info1HTML);
	  });

	  $("#addMoreSongs").click(function(){
	    	console.log("clicked");
	    	$.ajax({
    			url: "songs2.json"
	  		}).done(function(data){
	  			console.log(data.songs.length);
	    		for (var i = 0; i < data.songs.length; i++){
	    		info2HTML += info1HTML + "<div class='song'><h3>" + data.songs[i].name + "</h3>" + 
	    								"<p>Artist: " + data.songs[i].artist + "</p>" +
	    								"<p>On the album: " + data.songs[i].album + "</p>" + 
	    								'<button type="button" value="delete">Delete Song</button></div>';
	   		  }
	    $("#info").html(info2HTML);
	    });
		});
		$("#info").on('click', "button[value='delete']", function(){
			console.log("clicked delete");
			$(this).parent().remove();
		});
  });

// $( "#dataTable tbody" ).on( "click", "tr", function() {
//   console.log( $( this ).text() );
// });






