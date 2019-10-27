let topics = ["cat", "dog", "pig", "owl", "duck", "parrot", "fox", "elephant", "gorilla", "shark"]

for (let i = 0; i < topics.length; i++) {
    let button = $("<button>");
    button.append(topics[i]);
    button.attr("class", "search-term")
    button.attr("animal-type", topics[i]);
    $("#search-buttons").append(button);
}

$(".search-term").on("click", function() {
  // new variable (person) contains search button attribute "data-animal"
  var animal = $(this).attr("animal-type");
  var queryUrl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=jhPOZhUKBDuDczyOSuEabgqPr58TyBMk&limit=10";

  // AJAX jQuery function requests data from queryURL
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    let results = response.data;

    for (let i = 0; i < results.length; i++) {
      let gifDiv = $("<div>");

      let rating = results[i].rating;

      let info = $("<p>").text("Rating: " + rating);

      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height.url);

      gifDiv.prepend(info);
      gifDiv.prepend(animalImage);

      $("#results").prepend(gifDiv);
    }
  });
});
