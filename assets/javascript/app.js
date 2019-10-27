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

refreshTopicButtons();

function refreshTopicButtons() {
  $("#search-buttons").empty();
  for (let i = 0; i < topics.length; i++) {
    let button = $("<button>");
    button.append(topics[i]);
    button.attr("class", "search-button btn btn-outline-primary");
    button.attr("search-term", topics[i]);
    $("#search-buttons").append(button);
  }

  $(".search-button").on("click", function() {
    let searchTerm = $(this).attr("search-term");
    let queryUrl =
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

        var image = $("<img>");
        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        image.attr("data-state", "still");
        image.attr("class", "image-only");

        image.on("click", function() {
          let state = $(this).attr("data-state");
          console.log(state);
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });

        gifDiv.prepend(info);
        gifDiv.prepend(image);

        $("#results").prepend(gifDiv);
      }
    });
  });
}

$("#topic-input").keyup(function() {
  userTopicInput = $(this).val();
});

$("#add-topic-button").on("click", function(event) {
  event.preventDefault();
  let searchInput = userTopicInput;
  topics.push(searchInput);
  refreshTopicButtons();
});
