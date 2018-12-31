$(document).ready(function() {

var topics = ["NFL", "NBA", "MLB", "CFB", "WNBA", "NASCAR", "TENNIS", "SOCCER"];
var limit = 10;
var favArray = [];
var newFavArray = [];
var favClassCtr = 0;
var divClassCtr = 0;
var stringDivClassCtr;
var stringFavCtr;


function showButtons(){
    for(var i=0; i < topics.length; i++){
        var button = $("<button>");
        button.addClass("sportButtons btn-outline-light");
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
        $("#getStartedText").empty();
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
                    divClassCtr++;
                    favClassCtr++;
                    var newDiv = $("<div>");
                    var ratingParagraph = $("<p>").text("Rating: " + gifResults[i].rating);
                    var downloadButton = $("<button>");
                    downloadButton.addClass("downloadButton mb-2");
                    downloadButton.attr("data-name", gifResults[i].title);
                    downloadButton.attr("counter", favClassCtr);
                    downloadButton.text("♡");
                    var titleParagraph = $("<p>").text(gifResults[i].title);
                    var gifImage= $("<img>");
                    gifImage.addClass("gif");
                    titleParagraph.addClass("gifTitle pt-2 pr-1")
                    gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                    newDiv.addClass("float-left border m-1 ");
                    newDiv.attr("counter", divClassCtr);
                    newDiv.append(titleParagraph);
                    newDiv.append(gifImage);
                    newDiv.append(ratingParagraph);
                    newDiv.append(downloadButton);
                    favArray.push(newDiv);
                    $("#gifBox").append(newDiv);
    
                    if(gifResults[i].title === ""){
                        titleParagraph = $("<p>").text("**No Title Available**");
                        titleParagraph.addClass("gifTitle pt-2")
                        newDiv.prepend(titleParagraph);
                     }
                }
    
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
    
                $(".downloadButton").one("click", function() {
                    var ctrAttr = $(this).attr("counter");
                    console.log(favArray);
                    console.log(limit);
                    for(var i=0; i < favArray.length; i++){
                        if(ctrAttr === favArray[i].attr("counter")){
                            console.log("yup");
                        var copyDiv = favArray[i].clone();
                        $("#favorites").append(copyDiv);
                        }
                     }
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
                            for (var i = limit - 10; i < limit; i++) {
                                divClassCtr++;
                                favClassCtr++;
                                var newGifDiv = $("<div>");
                                var newRatingParagraph = $("<p>").text("Rating: " + newGifResults[i].rating);
                                var newDownloadButton = $("<button>");
                                newDownloadButton.addClass("downloadButton mb-2");
                                newDownloadButton.attr("data-name", newGifResults[i].title);
                                newDownloadButton.attr("newcounter", favClassCtr);
                                newDownloadButton.text("♡");
                                var newTitleParagraph = $("<p>").text(newGifResults[i].title);
                                var newGifImage= $("<img>");
                                newTitleParagraph.addClass("gifTitle pt-2 pr-1")
                                newGifImage.addClass("gif");
                                newGifImage.attr("src", newGifResults[i].images.fixed_height_still.url);
                                newGifDiv.addClass("float-left border m-1");
                                newGifDiv.attr("newcounter", divClassCtr);
                                newGifDiv.append(newTitleParagraph);
                                newGifDiv.append(newGifImage);
                                newGifDiv.append(newRatingParagraph);
                                newGifDiv.append(newDownloadButton);
                                favArray.push(newGifDiv);
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
    
                    $(".downloadButton").one("click", function() {
                        var newCtrAttr = $(this).attr("newcounter");
                        for(var i=0; i < favArray.length; i++){
                        if(newCtrAttr === favArray[i].attr("newcounter")){
                            var newCopyDiv = favArray[i].clone();
                        $("#favorites").append(newCopyDiv);
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
            });
                
        });
        
    });
    $('#sportInput').val('');
}

showButtons();

$(".sportButtons").on("click", function() {
    $("#gifBox").empty();
    $("#getStartedText").empty();
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
                divClassCtr++;
                favClassCtr++;
                var newDiv = $("<div>");
                var ratingParagraph = $("<p>").text("Rating: " + gifResults[i].rating);
                var downloadButton = $("<button>");
                downloadButton.addClass("downloadButton mb-2");
                downloadButton.attr("data-name", gifResults[i].title);
                downloadButton.attr("counter", favClassCtr);
                downloadButton.text("♡");
                var titleParagraph = $("<p>").text(gifResults[i].title);
                var gifImage= $("<img>");
                gifImage.addClass("gif");
                titleParagraph.addClass("gifTitle pt-2 pr-1")
                gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                newDiv.addClass("float-left border m-1");
                newDiv.attr("counter", divClassCtr);
                newDiv.append(titleParagraph);
                newDiv.append(gifImage);
                newDiv.append(ratingParagraph);
                newDiv.append(downloadButton);
                favArray.push(newDiv);
                $("#gifBox").append(newDiv);

                if(gifResults[i].title === ""){
                    titleParagraph = $("<p>").text("**No Title Available**");
                    titleParagraph.addClass("gifTitle pt-2")
                    newDiv.prepend(titleParagraph);
                 }
            }
            console.log(favArray);
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

            $(".downloadButton").one("click", function() {
                var ctrAttr = $(this).attr("counter");
                for(var i=0; i < favArray.length; i++){
                    if(ctrAttr === favArray[i].attr("counter")){
                    var copyDiv = favArray[i].clone();
                    $("#favorites").append(copyDiv);
                    }
                 }
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
                            divClassCtr++;
                            favClassCtr++;
                            var newGifDiv = $("<div>");
                            var newRatingParagraph = $("<p>").text("Rating: " + newGifResults[i].rating);
                            var newDownloadButton = $("<button>");
                            newDownloadButton.addClass("downloadButton mb-2");
                            newDownloadButton.attr("data-name", newGifResults[i].title);
                            newDownloadButton.attr("newcounter", favClassCtr);
                            newDownloadButton.text("♡");
                            var newTitleParagraph = $("<p>").text(newGifResults[i].title);
                            var newGifImage= $("<img>");
                            newTitleParagraph.addClass("gifTitle pt-2 pr-1")
                            newGifImage.addClass("gif");
                            newGifImage.attr("src", newGifResults[i].images.fixed_height_still.url);
                            newGifDiv.addClass("float-left border m-1");
                            newGifDiv.attr("newcounter", divClassCtr);
                            newGifDiv.append(newTitleParagraph);
                            newGifDiv.append(newGifImage);
                            newGifDiv.append(newRatingParagraph);
                            newGifDiv.append(newDownloadButton);
                            favArray.push(newGifDiv);
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

                $(".downloadButton").one("click", function() {
                    var newCtrAttr = $(this).attr("newcounter");
                    for(var i=0; i < favArray.length; i++){
                    if(newCtrAttr === favArray[i].attr("newcounter")){
                        var newCopyDiv = favArray[i].clone();
                    $("#favorites").append(newCopyDiv);
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
        });
            
    });
    
});

$("#submitButton").on("click", function(){
    event.preventDefault();
    remakeButtons();
});



});
