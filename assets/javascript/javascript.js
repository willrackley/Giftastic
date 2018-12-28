$(document).ready(function() {

var topics = ["NFL", "NBA", "MLB", "CFB", "WNBA", "NASCAR", "TENNIS", "SOCCER"];
var limit = 10;

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
                for (var i = 0; i < 10; i++) {
    
                    var newDiv = $("<div>");
                    var ratingParagraph = $("<p>").text("Rating: " + gifResults[i].rating);
                    var titleParagraph = $("<p>").text(gifResults[i].title);
                    var gifImage= $("<img>");
                    gifImage.addClass("gif");
                    titleParagraph.addClass("gifTitle pt-2 pr-1")
                    gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                    newDiv.addClass("float-left border m-1");
                    newDiv.append(titleParagraph);
                    newDiv.append(gifImage);
                    newDiv.append(ratingParagraph);
                    $("#gifBox").prepend(newDiv);

                    if(gifResults[i].title === ""){
                        titleParagraph = $("<p>").text("**No Title Available**");
                        titleParagraph.addClass("gifTitle pt-2")
                        newDiv.prepend(titleParagraph);
                        
                     }
                }

                 //Button to add more Gifs
            var button = $("<button>");
            button.addClass("addMoreGifs");
            button.text("10 more gifs");
            $("#addMoreButtonRow").html(button);

            $(".addMoreGifs").on("click", function() {
                
                limit = limit + 10;
                var newQueryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                topicName + "&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit="+ limit;
        
               $.ajax({
                    url: newQueryURL,
                    method: "GET"
                    }).then(function(response) {
                        var newGifResults = response.data;
                        for (var i = limit-10; i < limit; i++) {
                            var newGifDiv = $("<div>");
                            var newRatingParagraph = $("<p>").text("Rating: " + newGifResults[i].rating);
                            var newTitleParagraph = $("<p>").text(newGifResults[i].title);
                            var newGifImage= $("<img>");
                            newTitleParagraph.addClass("gifTitle pt-2 pr-1")
                            newGifImage.addClass("gif");
                            newGifImage.attr("src", newGifResults[i].images.fixed_height_still.url);
                            newGifDiv.addClass("float-left border m-1");
                            newGifDiv.append(newTitleParagraph);
                            newGifDiv.append(newGifImage);
                            newGifDiv.append(newRatingParagraph);
                            $("#gifBox").append(newGifDiv);

                            if(newGifResults[i].title === ""){
                                newTitleParagraph = $("<p>").text("**No Title Available**");
                                newTitleParagraph.addClass("gifTitle pt-2")
                                newGifDiv.prepend(newTitleParagraph);
                                
                             }
                        }

                        $(".gif").on("click", function() {
                            var source = $(this).attr("src");
                            for(var i = 0; i < limit; i++) {
                            if(source === newGifResults[i].images.fixed_height_still.url){
                                $(this).attr("src", newGifResults[i].images.fixed_height.url);
                            }
                            if(source === newGifResults[i].images.fixed_height.url){
                                $(this).attr("src", newGifResults[i].images.fixed_height_still.url);
                            }
                            }
                        });
                        
            });
           
        });
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
    
    limit = 10;
    var topicName = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicName + "&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit="+ limit;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            var gifResults = response.data;
            for (var i = 0; i < limit; i++) {

                var newDiv = $("<div>");
                var ratingParagraph = $("<p>").text("Rating: " + gifResults[i].rating);
                var titleParagraph = $("<p>").text(gifResults[i].title);
                var gifImage= $("<img>");
                gifImage.addClass("gif");
                titleParagraph.addClass("gifTitle pt-2 pr-1")
                gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                newDiv.addClass("float-left border m-1");
                newDiv.append(titleParagraph);
                newDiv.append(gifImage);
                newDiv.append(ratingParagraph);
                $("#gifBox").prepend(newDiv);

                if(gifResults[i].title === ""){
                    titleParagraph = $("<p>").text("**No Title Available**");
                    titleParagraph.addClass("gifTitle pt-2")
                    newDiv.prepend(titleParagraph);
                    
                 }
            }
            
            
            //Button to add more Gifs
            var button = $("<button>");
            button.addClass("addMoreGifs");
            button.text("10 more gifs");
            $("#addMoreButtonRow").html(button);

            $(".addMoreGifs").on("click", function() {
                
                limit = limit + 10;
                var newQueryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                topicName + "&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit="+ limit;
        
               $.ajax({
                    url: newQueryURL,
                    method: "GET"
                    }).then(function(response) {
                        var newGifResults = response.data;
                        for (var i = limit-10; i < limit; i++) {
                            var newGifDiv = $("<div>");
                            var newRatingParagraph = $("<p>").text("Rating: " + newGifResults[i].rating);
                            var newTitleParagraph = $("<p>").text(newGifResults[i].title);
                            var newGifImage= $("<img>");
                            newTitleParagraph.addClass("gifTitle pt-2 pr-1")
                            newGifImage.addClass("gif");
                            newGifImage.attr("src", newGifResults[i].images.fixed_height_still.url);
                            newGifDiv.addClass("float-left border m-1");
                            newGifDiv.append(newTitleParagraph);
                            newGifDiv.append(newGifImage);
                            newGifDiv.append(newRatingParagraph);
                            $("#gifBox").append(newGifDiv);

                            if(newGifResults[i].title === ""){
                                newTitleParagraph = $("<p>").text("**No Title Available**");
                                newTitleParagraph.addClass("gifTitle pt-2")
                                newGifDiv.prepend(newTitleParagraph);
                                
                             }
                        }

                        $(".gif").on("click", function() {
                            var source = $(this).attr("src");
                            for(var i = 0; i < limit; i++) {
                            if(source === newGifResults[i].images.fixed_height_still.url){
                                $(this).attr("src", newGifResults[i].images.fixed_height.url);
                            }
                            if(source === newGifResults[i].images.fixed_height.url){
                                $(this).attr("src", newGifResults[i].images.fixed_height_still.url);
                            }
                            }
                        });
                        
            });
           
        });
        

        $(".gif").on("click", function() {
            var source = $(this).attr("src");
            for(var i = 0; i < limit; i++) {
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
