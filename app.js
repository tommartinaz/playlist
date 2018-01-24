var albumArt = $.get("http://0.0.0.0:8000/music.json");
albumArt.done(function(data) {
  var albumInfo = (data.results);

  //-----------------------------------------------------------
  //  RANDOMIZE ALBUM ORDER
  for (var i = albumInfo.length - 1, j = 0, temp = null; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = albumInfo[i];
    albumInfo[i] = albumInfo[j];
    albumInfo[j] = temp;
  }
  //------------------------------------------------------------

  //------------------------------------------------------------
  //SORTS ALBUMS BY ARTIST AND ALBUM TITLE
  var sortedAlbums = albumInfo.map(a => Object.assign({}, a));
  sortedAlbums = sortedAlbums.sort(function(a, b) {
    if (a.artist < b.artist) {
      return -1;
    } else if (a.artist === b.artist) {
      if (a.title < b.title) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  })
  //-------------------------------------------------------------


  for (i = 0; i < sortedAlbums.length; i++) {
    $("#thumbnails").append(`
      <div class='thumbnails'>
      <img src='images/${sortedAlbums[i].cover_art}'></div>
    `);
  };
  $("#thumbnails .thumbnails").click(function() {
    var infoForFind = $(event.target).attr("src").replace('images/', '');
    var found = albumInfo.find(function(value) {
      return value.cover_art === infoForFind;
    });
    $(".text").append(`
      ${found.artist} - ${found.title}<br>
      `);
  });
  for (var k = 0; k < 3; k++) {
    var divID = "album" + (k + 1);

    $(".right").append(`
      <div id=${divID} class="albumArt">
      <img src="images/${albumInfo[k].cover_art}">
      </div>
  `);
  }
  $("#clear-tracks").click(function() {
    $(".text").empty();
  });
});
$("#submit-bin").click(function() {
  var inputData = $(".text").val();
  console.log(inputData);
  $.post("https://lit-fortress-6467.herokuapp.com/post", inputData, function() {
    alert('got it');
  })
  $(".text").empty();
});
