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
    // parse the returned data
    var movieText = '';
    for (var i = 0; i < data.Search.length; i++) {
      //push movies into movies array
      movies.push(data.Search[i]);
      movieText += '<div class="col-sm-3"><div class="movie text-center" data-id="'+ data.Search[i].imdbID + '"><p><strong> ' + data.Search[i].Title + ', ' +data.Search[i].Year + '</strong></p>';
      movieText += '<img src="' + data.Search[i].Poster + '" class="thumbnail posterImg"/>';
      movieText += '<div class="movie-footer"><button class="btn btn-default btn-sm btn_delete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></div></div>';

    }


    console.log(movies);
    // display the data on the DOM
    $('#outputDiv').html(movieText);
  }; // end displaySearchResults
}); // end doc ready

//button click event for delete button
  $( document ).on( 'click', '.btn_delete', function(event) {
     $(this).closest('.movie').remove();
 }); // end on click for .btn_delete
