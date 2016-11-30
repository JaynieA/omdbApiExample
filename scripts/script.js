$(document).ready(function() {
  $( '#searchButton' ).on('click', function() {
    console.log( 'on click button' );
    //get user input for the search
    var movieTitle = $( '#searchIn' ).val();
    console.log('searching for: ',movieTitle);
    //assemble search string url
    var searchUrl = 'https://www.omdbapi.com/?s=' + movieTitle;
    console.log(searchUrl);
    // ajax call to that url
    $.ajax({
      url: searchUrl,
      dataTyle: 'JSON',
      success: function(data) {
        console.log('success, data: ', data);
        // parse the returned data

        displaySearchResults(data);
      }
    }); // end ajax
  }); // end #searchButton onclick

  var displaySearchResults = function(data) {
    console.log('in displaySearchResults');
    for (var i = 0; i < data.Search.length; i++) {
      console.log(data.Search[i]);
      // display the data on the DOM
      $('#outputDiv').append('<p>'+data.Search[i].Title+ ', '+ data.Search[i].Year +'</p>');
      $('#outputDiv').append('<p>'+data.Search[i].imdbID+ ', '+ data.Search[i].Type +'</p>');
      $('#outputDiv').append('<img src="'+data.Search[i].Poster +'"/>');
    }
  }; // end displaySearchResults

}); // end doc ready
