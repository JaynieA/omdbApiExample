var movies = [];
var favorite = [];
$(document).ready(function() {
  //give focus to search input on load
  var searchInput = $('#searchIn');
  searchInput.focus();
  // form submit event
  $( '#searchForm' ).on('submit', function(e) {
    e.preventDefault();
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
    //clear search input value and remove focus from input
    searchInput.val('');
    searchInput.blur();
  }); // end #searchForm onsubmit

  var displaySearchResults = function(data) {
    console.log('in displaySearchResults');
    for (var i = 0; i < data.Search.length; i++) {
      //push (unshift) movies into FRONT of movies array
      movies.unshift(data.Search[i]);
    } // end for
    updateMoviesOnDOM(movies);
  }; // end displaySearchResults
}); // end doc ready

var updateMoviesOnDOM = function(arrayToDisplay) {
  var movieText = '';
  // iterate through movies array, parse data and display on the DOM
  for (var y = 0; y < arrayToDisplay.length; y++) {
    movieText += '<div class="col-sm-3"><div class="movie text-center" data-id="'+ arrayToDisplay[y].imdbID + '"><p><strong> ' + arrayToDisplay[y].Title + ', ' + arrayToDisplay[y].Year + '</strong></p>';
    movieText += '<img src="' + arrayToDisplay[y].Poster + '" class="thumbnail img-responsive posterImg"/>';
    movieText += '<div class="movie-footer"><button class="btn btn-default btn-sm btn_delete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>';
    movieText += '<button class="btn btn-default btn-sm btn_favorite"><span class="glyphicon glyphicon-star" aria-hidden="true"></span></button></div></div></div>';
  } // end for
  console.log(arrayToDisplay);
  // display the data on the DOM
  $('#outputDiv').html(movieText);
}; // end updateMoviesOnDOM

//button click event for delete button
$( document ).on( 'click', '.btn_delete', function(event) {
  // fadeOut and remove movie from the DOM
  $(this).closest('.movie').fadeOut(500, function() {
    $(this).remove();
    updateMoviesOnDOM(movies);
  }); // end fadeOut
  // iterate through movies array to find the movie with the same imdbID as the deleted movie's data attribute
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].imdbID === $(this).closest('.movie').data().id) {
      var index = movies.indexOf(movies[i]);
      //remove the matching movie from movies array
      if (index > -1) {
          movies.splice(index, 1);
      }
    }
  } // end for
}); // end on click for .btn_delete

//button click event for .btn_favorite
$( document ).on( 'click', '.btn_favorite', function(event) {
  //push favorited movie to favorites array
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].imdbID === $(this).closest('.movie').data().id) {
      // add this movie to favorites array
      favorite.push(movies[i]);
      $(this).find('span').removeClass('glyphicon-star');
      $(this).find('span').addClass('glyphicon-ok');
      console.log(favorite);
    } // end if
  } // end for
}); // end onclick for .btn_favorite

//button click event to display favorites
$( document ).on('click', '#displayFavorites', function() {
  console.log('display favorites clicked');
  //relace movies on DOM with favorites
  updateMoviesOnDOM(favorite);
}); // end onclick for #displayFavorites
