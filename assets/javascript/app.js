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
      gifDiv.attr("class", "image-result rounded");

      let rating = results[i].rating;

      let info = $("<div>");
      info.attr("class", "image-details");
      info.html("<p> Rating: " + rating.toUpperCase() + "</p>");

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
