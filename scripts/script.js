var movies = [];
$(document).ready(function() {
  //give focus to input on load
  var searchInput = $('#searchIn');
  searchInput.focus();

  $( '#searchForm' ).on('submit', function(e) {
    e.preventDefault();
    console.log( 'on click button' );
    //get user input for the search
    var movieTitle = $( '#searchIn' ).val();
    // alert the user if they left the input empty when trying to search
    if(movieTitle === '') {
      $('#inputErrorModal').modal('show');
      return;
    } // end if
    console.log('searching for: ',movieTitle);
    //assemble search string url
    var searchUrl = 'https://www.omdbapi.com/?s=' + movieTitle;
    // ajax call to that url
    $.ajax({
      url: searchUrl,
      dataTyle: 'JSON',
      success: function(data) {
        console.log('success, data: ', data);
        displaySearchResults(data);
      }
    }); // end ajax
    //clear search input value
    searchInput.val('');
    //remove focus from search input after search
    searchInput.blur();
  }); // end #searchForm onsubmit

  var displaySearchResults = function(data) {
    console.log('in displaySearchResults');
    for (var i = 0; i < data.Search.length; i++) {
      //push (unshift) movies into front of movies array
      movies.unshift(data.Search[i]);
    }
    var movieText = '';
    // iterate through movies array, parse data and display on the DOM
    for (var y = 0; y < movies.length; y++) {
      movieText += '<div class="col-sm-3"><div class="movie text-center" data-id="'+ movies[y].imdbID + '"><p><strong> ' + movies[y].Title + ', ' + movies[y].Year + '</strong></p>';
      movieText += '<img src="' + movies[y].Poster + '" class="thumbnail img-responsive posterImg"/>';
      movieText += '<div class="movie-footer"><button class="btn btn-default btn-sm btn_delete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></div></div>';
    }
    console.log(movies);
    // display the data on the DOM
    $('#outputDiv').html(movieText);
  }; // end displaySearchResults
}); // end doc ready

//button click event for delete button
$( document ).on( 'click', '.btn_delete', function(event) {
  // fadeOut the removed movie from the DOM
  $(this).closest('.movie').fadeOut();
  // iterate through movies array to match omdbID with data attribute of movie to delete
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].imdbID === $(this).closest('.movie').data().id) {
      var index = movies.indexOf(movies[i]);
      //remove the movie from movies array
      if (index > -1) {
          movies.splice(index, 1);
      }
    }
  }
}); // end on click for .btn_delete
