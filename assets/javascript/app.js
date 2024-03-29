let topics = [
  "cat",
  "dog",
  "pig",
  "owl",
  "duck",
  "parrot",
  "fox",
  "elephant",
  "gorilla",
  "shark"
];

let userTopicInput;

let image;

let searchTerm;

let queryUrl;

let lastTopic;

let timesLoadMoreClicked = 1;

function refreshTopicButtons() {
  $("#search-buttons").empty();

  for (let i = 0; i < topics.length; i++) {
    let button = $("<button>");
    button.append(topics[i]);
    button.attr("class", "search-button btn btn-outline-primary");
    button.attr("id", topics[i]);
    $("#search-buttons").append(button);
  }
}

function loadGifs(whichTopic) {
    $("#results").empty();
  lastTopic = $(whichTopic);
  searchTerm = $(whichTopic).attr("id");
  queryUrl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    searchTerm +
    "&api_key=jhPOZhUKBDuDczyOSuEabgqPr58TyBMk&limit=10";

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    let results = response.data;

    for (let i = 0; i < results.length; i++) {
      let gifDiv = $("<div>");
      gifDiv.attr("class", "image-result bg-primary rounded");

      let title = results[i].title;
      let rating = results[i].rating;
      let giphyUrl = results[i].url;

      let info = $("<div>");
      info.attr("class", "image-details text-light");
      info.append("<p><b>Title: </b>" + title + "</p>")
      info.append("<p> Rating: " + rating.toUpperCase() + "</p>");
      info.append("<p><b><a href=" + giphyUrl + ">" + "Giphy URL" + "</a></b></p>")

      image = $("<img>");
      image.attr("src", results[i].images.fixed_height_still.url);
      image.attr("data-still", results[i].images.fixed_height_still.url);
      image.attr("data-animate", results[i].images.fixed_height.url);
      image.attr("data-state", "still");
      image.attr("class", "image-only");
      image.attr("id", i);

      gifDiv.prepend(info);
      gifDiv.prepend(image);

      $("#results").prepend(gifDiv);
    }
  });
}

function startStopGifs(whichImage) {
  let state = $(whichImage).attr("data-state");
  if (state === "still") {
    $(whichImage).attr("src", $(whichImage).attr("data-animate"));
    $(whichImage).attr("data-state", "animate");
  } else if (state === "animate") {
    $(whichImage).attr("src", $(whichImage).attr("data-still"));
    $(whichImage).attr("data-state", "still");
  }
}

function showLoadMoreButton() {
  $("#load-more").css("display", "block");
}

function loadMoreGifs(whichTopic) {
  timesLoadMoreClicked + 1;
  console.log(timesLoadMoreClicked);
  whichTopic = lastTopic;
  searchTerm = $(whichTopic).attr("id");
  queryUrl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    searchTerm +
    "&api_key=jhPOZhUKBDuDczyOSuEabgqPr58TyBMk&limit=10&offset=" +
    10 * timesLoadMoreClicked;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    let results = response.data;

    for (let i = 0; i < results.length; i++) {
      let gifDiv = $("<div>");
      gifDiv.attr("class", "image-result bg-primary rounded");

      let title = results[i].title;
      let rating = results[i].rating;

      let info = $("<div>");
      info.attr("class", "image-details text-light");
      info.append("<p><b>Title: </b>" + title + "</p>")
      info.append("<p><b>Rating: </b>" + rating.toUpperCase() + "</p>");

      image = $("<img>");
      image.attr("src", results[i].images.fixed_height_still.url);
      image.attr("data-still", results[i].images.fixed_height_still.url);
      image.attr("data-animate", results[i].images.fixed_height.url);
      image.attr("data-state", "still");
      image.attr("class", "image-only");
      image.attr("id", i);

      gifDiv.prepend(info);
      gifDiv.prepend(image);

      $("#results").append(gifDiv);
    }
  });
}
