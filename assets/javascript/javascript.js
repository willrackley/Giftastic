$(document).ready(function() {

var topics = ["NFL", "NBA", "MLB", "CFB", "WNBA", "NASCAR", "TENNIS", "SOCCER"];

function showButtons(){
    for(var i=0; i < topics.length; i++){
        var button = $("<button>");
        button.addClass("sportButtons");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#topicButtons").append(button);
    }
}

function remakeButtons(){
    var inputText = $('#sportInput').val().toUpperCase().trim();
    topics.push(inputText);
    $('#topicButtons').empty();
    showButtons();
   
    $(".sportButtons").on("click", function() {
        $("#gifBox").empty();
        var topicName = $(this).attr("data-name")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topicName + "&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=10";
    
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
    
                var gifResults = response.data;
                for (var i = 0; i < topics.length; i++) {
    
                    var newDiv = $("<div>");
                    var ratingParagraph = $("<p>").text("Rating: " + gifResults[i].rating);
                    var gifImage= $("<img>");
                    gifImage.addClass("gif");
                    gifImage.addClass("figure-img");
                    gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                    newDiv.addClass("float-left");
                    newDiv.append(gifImage);
                    newDiv.append(ratingParagraph);
                    $("#gifBox").prepend(newDiv);
                }
                $(".gif").on("click", function() {
                   
                    var source = $(this).attr("src");
                    for(var i = 0; i < gifResults.length; i++) {
                    if(source === gifResults[i].images.fixed_height_still.url){
                        $(this).attr("src", gifResults[i].images.fixed_height.url);
                    }
                    if(source === gifResults[i].images.fixed_height.url){
                        $(this).attr("src", gifResults[i].images.fixed_height_still.url);
                    }
                    }
                });
        });    
    });
    $('#sportInput').val('');
}

showButtons();

$(".sportButtons").on("click", function() {
    $("#gifBox").empty();
    var topicName = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicName + "&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            var gifResults = response.data;
            for (var i = 0; i < topics.length; i++) {

                var newDiv = $("<div>");
                var ratingParagraph = $("<p>").text("Rating: " + gifResults[i].rating);
                var gifImage= $("<img>");
                gifImage.addClass("gif");
                gifImage.addClass("figure-img");
                gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                newDiv.addClass("float-left");
                newDiv.append(gifImage);
                newDiv.append(ratingParagraph);
                $("#gifBox").prepend(newDiv);
            }
            $(".gif").on("click", function() {
               
                var source = $(this).attr("src");
                for(var i = 0; i < gifResults.length; i++) {
                if(source === gifResults[i].images.fixed_height_still.url){
                    $(this).attr("src", gifResults[i].images.fixed_height.url);
                }
                if(source === gifResults[i].images.fixed_height.url){
                    $(this).attr("src", gifResults[i].images.fixed_height_still.url);
                }
                }
            });
    });

        
});

$("#submitButton").on("click", function(){
    event.preventDefault();
    remakeButtons();
});


});
