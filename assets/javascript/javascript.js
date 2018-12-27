var topics = ["NFL", "NBA", "MlB", "CFB", "WNBA", "NASCAR", "TENNIS", "SOCCER"];

function showButtons(){
    for(var i=0; i < topics.length; i++){
        var button = $("<button>");
        button.addClass("sportButtons");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#topicButtons").append(button);
    }
}

showButtons();

$("button").on("click", function() {
    $("#gifBox").empty();
    var topicName = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicName + "&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(queryURL);

            var gifResults = response.data;
            for (var i = 0; i < gifResults.length; i++) {
                var newDiv = $("<div>");
                var ratingParagraph = $("<p>").text("Rating: " + response.data[i].rating);
                var gifImage= $("<img>");
                gifImage.attr("src", gifResults[i].images.fixed_height.url);
                newDiv.append(ratingParagraph);
                newDiv.append(gifImage);
                $("#gifBox").prepend(newDiv);
            }
        })
    
});

