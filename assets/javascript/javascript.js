$(document).ready(function() {

var sports = ["NFL", "NBA", "MLB", "CFB", "WNBA", "NASCAR", "TENNIS", "SOCCER"];
var cars = ["MERCEDES-BENZ", "AUDI", "TOYOTA", "LEXUS", "FERARI", "FORD"];
var limit = 10;
var favArray = [];
var moreGifsArray = [];
var favGifs = [];
var favClassCtr = 0;
var divClassCtr = 0;
var stringDivClassCtr;
var stringFavCtr;

function showCarButtons(){
    for(var i=0; i < cars.length; i++){
        var button = $("<button>");
        button.addClass("carButtons btn-outline-light");
        button.attr("data-name", cars[i]);
        button.text(cars[i]);
        $("#topicButtons").append(button);
        
    }
}
function showSportsButtons(){
    for(var i=0; i < sports.length; i++){
        var button = $("<button>");
        button.addClass("sportButtons btn-outline-light");
        button.attr("data-name", sports[i]);
        button.text(sports[i]);
        $("#topicButtons").append(button);
        
    }
}

function addMoreGifsButton(){
    var button = $("<button>");
    button.addClass("addMoreGifs");
    button.text("10 more gifs");
    $("#addMoreButtonRow").html(button);


    
}

function remakeSportsButtons(){

    var inputText = $('#sportInput').val().toUpperCase().trim();
    if(inputText === ""){
        
    } else {
    sports.push(inputText);
    $('#topicButtons').empty();
    $("#addMoreButtonRow").show();
    showSportsButtons();
   
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
                    var gifImage = $("<img>");
                    var downloadGif = $("<a>");
                    gifImage.addClass("gif");
                    titleParagraph.addClass("gifTitle pt-2 pr-1")
                    gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                    downloadGif.attr("download");
                    downloadGif.addClass("ml-3");
                    downloadGif.attr("target", "_blank");
                    downloadGif.attr("href", gifResults[i].images.fixed_height.url);
                    downloadGif.text("download");
                    newDiv.addClass("float-left border m-1");
                    newDiv.attr("counter", divClassCtr);
                    newDiv.append(titleParagraph);
                    newDiv.append(gifImage);
                    newDiv.append(ratingParagraph);
                    newDiv.append(downloadButton);
                    newDiv.append(downloadGif);
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
                    for(var i = 0; i < gifResults.length; i++) {
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
                    var favDiv = $("<div>");
                    var deleteFavButton = $("<button>");
                    if(favGifs.length > 0){
                        favGifs.splice(0,1);
                    }
                    for(var i=0; i < favArray.length; i++){
                        if(ctrAttr === favArray[i].attr("counter")){
                        var copyDiv = favArray[i].clone();
                        $(copyDiv).attr("id", "animateFavGif");
                        deleteFavButton.text("X");
                        deleteFavButton.attr("id", "deleteFavItem");
                        deleteFavButton.addClass("float-left border-left-0");
                        favDiv.append(copyDiv);
                        favDiv.append(deleteFavButton);
                        favGifs.push(favDiv);
                        $("#favorites").prepend(favGifs);
                        }
                    } 
                    $("#animateFavGif").on("click", function() {  
                        console.log($(this));       
                        var secondNode = $(this.childNodes[2]).attr("src");
                        var firstNode = $(this.childNodes[1]).attr("src");
                        for(var i = 0; i < gifResults.length; i++) {
                        if(firstNode === gifResults[i].images.fixed_height_still.url || secondNode === gifResults[i].images.fixed_height_still.url){
                            $(this.childNodes[2]).attr("src", gifResults[i].images.fixed_height.url);
                            $(this.childNodes[1]).attr("src", gifResults[i].images.fixed_height.url);
                        }
                        if(firstNode === gifResults[i].images.fixed_height.url || secondNode === gifResults[i].images.fixed_height.url){
                            $(this.childNodes[2]).attr("src", gifResults[i].images.fixed_height_still.url);
                            $(this.childNodes[1]).attr("src", gifResults[i].images.fixed_height_still.url);
                        }
                        }
                    });
                    $("#deleteFavItem").on("click", function(){
                        console.log(this);
                        favDiv.remove();
                    });
                });
    

                if(moreGifsArray.length === 0){
                    moreGifsArray.push(topicName);
                
                    } else {
                        moreGifsArray.splice(0,1);
                        moreGifsArray.push(topicName);
                    
                    }   
        });
        
    });
    $('#sportInput').val('');
}
}

function remakeCarsButtons(){

    var inputText = $('#sportInput').val().toUpperCase().trim();
    if(inputText === ""){
        
    } else {
    cars.push(inputText);
    $('#topicButtons').empty();
    $("#addMoreButtonRow").show();
    showCarButtons();
   
    $(".carButtons").on("click", function() {
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
                    var gifImage = $("<img>");
                    var downloadGif = $("<a>");
                    gifImage.addClass("gif");
                    titleParagraph.addClass("gifTitle pt-2 pr-1")
                    gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                    downloadGif.attr("download");
                    downloadGif.addClass("ml-3");
                    downloadGif.attr("target", "_blank");
                    downloadGif.attr("href", gifResults[i].images.fixed_height.url);
                    downloadGif.text("download");
                    newDiv.addClass("float-left border m-1");
                    newDiv.attr("counter", divClassCtr);
                    newDiv.append(titleParagraph);
                    newDiv.append(gifImage);
                    newDiv.append(ratingParagraph);
                    newDiv.append(downloadButton);
                    newDiv.append(downloadGif);
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
                    for(var i = 0; i < gifResults.length; i++) {
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
                    var favDiv = $("<div>");
                    var deleteFavButton = $("<button>");
                    if(favGifs.length > 0){
                        favGifs.splice(0,1);
                    }
                    for(var i=0; i < favArray.length; i++){
                        if(ctrAttr === favArray[i].attr("counter")){
                        var copyDiv = favArray[i].clone();
                        $(copyDiv).attr("id", "animateFavGif");
                        deleteFavButton.text("X");
                        deleteFavButton.attr("id", "deleteFavItem");
                        deleteFavButton.addClass("float-left border-left-0");
                        favDiv.append(copyDiv);
                        favDiv.append(deleteFavButton);
                        favGifs.push(favDiv);
                        $("#favorites").prepend(favGifs);
                        }
                    } 
                    $("#animateFavGif").on("click", function() {  
                        console.log($(this));       
                        var secondNode = $(this.childNodes[2]).attr("src");
                        var firstNode = $(this.childNodes[1]).attr("src");
                        for(var i = 0; i < gifResults.length; i++) {
                        if(firstNode === gifResults[i].images.fixed_height_still.url || secondNode === gifResults[i].images.fixed_height_still.url){
                            $(this.childNodes[2]).attr("src", gifResults[i].images.fixed_height.url);
                            $(this.childNodes[1]).attr("src", gifResults[i].images.fixed_height.url);
                        }
                        if(firstNode === gifResults[i].images.fixed_height.url || secondNode === gifResults[i].images.fixed_height.url){
                            $(this.childNodes[2]).attr("src", gifResults[i].images.fixed_height_still.url);
                            $(this.childNodes[1]).attr("src", gifResults[i].images.fixed_height_still.url);
                        }
                        }
                    });
                    $("#deleteFavItem").on("click", function(){
                        console.log(this);
                        favDiv.remove();
                    });
                });
    

                if(moreGifsArray.length === 0){
                    moreGifsArray.push(topicName);
                
                    } else {
                        moreGifsArray.splice(0,1);
                        moreGifsArray.push(topicName);
                    
                    }   
        });
        
    });
    $('#carsInput').val('');
}
}




addMoreGifsButton();
$("#addMoreButtonRow").hide();
$(".form").hide();


$("#topicSports").on("click", function(){
    $("#topicSports").hide();
    $(".submitCarsButton").hide();
    $(".form").show();
    showSportsButtons();

    $(".sportButtons").on("click", function() {
        $("#addMoreButtonRow").show();
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
                    var gifImage = $("<img>");
                    var downloadGif = $("<a>");
                    gifImage.addClass("gif");
                    titleParagraph.addClass("gifTitle pt-2 pr-1")
                    gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                    downloadGif.attr("download");
                    downloadGif.addClass("ml-3");
                    downloadGif.attr("target", "_blank");
                    downloadGif.attr("href", gifResults[i].images.fixed_height.url);
                    downloadGif.text("download");
                    newDiv.addClass("float-left border m-1");
                    newDiv.attr("counter", divClassCtr);
                    newDiv.append(titleParagraph);
                    newDiv.append(gifImage);
                    newDiv.append(ratingParagraph);
                    newDiv.append(downloadButton);
                    newDiv.append(downloadGif);
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
                    console.log(source);
                    for(var i = 0; i < gifResults.length; i++) {
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
                    var favDiv = $("<div>");
                    var deleteFavButton = $("<button>");
                    if(favGifs.length > 0){
                        favGifs.splice(0,1);
                    }
                    for(var i=0; i < favArray.length; i++){
                        if(ctrAttr === favArray[i].attr("counter")){
                        var copyDiv = favArray[i].clone();
                        $(copyDiv).attr("id", "animateFavGif");
                        deleteFavButton.text("X");
                        deleteFavButton.attr("id", "deleteFavItem");
                        deleteFavButton.addClass("float-left border-left-0");
                        favDiv.append(copyDiv);
                        favDiv.append(deleteFavButton);
                        favGifs.push(favDiv);
                        $("#favorites").prepend(favGifs);
                        }
                    } 
                    $("#animateFavGif").on("click", function() {  
                        console.log($(this));       
                        var secondNode = $(this.childNodes[2]).attr("src");
                        var firstNode = $(this.childNodes[1]).attr("src");
                        for(var i = 0; i < gifResults.length; i++) {
                        if(firstNode === gifResults[i].images.fixed_height_still.url || secondNode === gifResults[i].images.fixed_height_still.url){
                            $(this.childNodes[2]).attr("src", gifResults[i].images.fixed_height.url);
                            $(this.childNodes[1]).attr("src", gifResults[i].images.fixed_height.url);
                        }
                        if(firstNode === gifResults[i].images.fixed_height.url || secondNode === gifResults[i].images.fixed_height.url){
                            $(this.childNodes[2]).attr("src", gifResults[i].images.fixed_height_still.url);
                            $(this.childNodes[1]).attr("src", gifResults[i].images.fixed_height_still.url);
                        }
                        }
                    });
                    $("#deleteFavItem").on("click", function(){
                        console.log(this);
                        favDiv.remove();
                    });
                });
    
    
                //code for setting up an array for when we add more gifs to the original 10 
                if(moreGifsArray.length === 0){
                moreGifsArray.push(topicName);
            
                } else {
                    moreGifsArray.splice(0,1);
                    moreGifsArray.push(topicName);
                
                }
                
            });     
    });
})

$("#topicCars").on("click", function(){
    $("#topicCars").hide();
    $("#topicSports").hide();
    $(".submitCarsButton").show();
    $(".submitSportsButton").hide();
    $(".form").show();
    $("#formHeading").text("Add a Car Manufacturer");
    showCarButtons(); 

    $(".carButtons").on("click", function() {
        $("#addMoreButtonRow").show();
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
                    var gifImage = $("<img>");
                    var downloadGif = $("<a>");
                    gifImage.addClass("gif");
                    titleParagraph.addClass("gifTitle pt-2 pr-1")
                    gifImage.attr("src", gifResults[i].images.fixed_height_still.url);
                    downloadGif.attr("download");
                    downloadGif.addClass("ml-3");
                    downloadGif.attr("target", "_blank");
                    downloadGif.attr("href", gifResults[i].images.fixed_height.url);
                    downloadGif.text("download");
                    newDiv.addClass("float-left border m-1");
                    newDiv.attr("counter", divClassCtr);
                    newDiv.append(titleParagraph);
                    newDiv.append(gifImage);
                    newDiv.append(ratingParagraph);
                    newDiv.append(downloadButton);
                    newDiv.append(downloadGif);
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
                    console.log(source);
                    for(var i = 0; i < gifResults.length; i++) {
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
                    var favDiv = $("<div>");
                    var deleteFavButton = $("<button>");
                    if(favGifs.length > 0){
                        favGifs.splice(0,1);
                    }
                    for(var i=0; i < favArray.length; i++){
                        if(ctrAttr === favArray[i].attr("counter")){
                        var copyDiv = favArray[i].clone();
                        $(copyDiv).attr("id", "animateFavGif");
                        deleteFavButton.text("X");
                        deleteFavButton.attr("id", "deleteFavItem");
                        deleteFavButton.addClass("float-left border-left-0");
                        favDiv.append(copyDiv);
                        favDiv.append(deleteFavButton);
                        favGifs.push(favDiv);
                        $("#favorites").prepend(favGifs);
                        }
                    } 
                    $("#animateFavGif").on("click", function() {  
                        console.log($(this));       
                        var secondNode = $(this.childNodes[2]).attr("src");
                        var firstNode = $(this.childNodes[1]).attr("src");
                        for(var i = 0; i < gifResults.length; i++) {
                        if(firstNode === gifResults[i].images.fixed_height_still.url || secondNode === gifResults[i].images.fixed_height_still.url){
                            $(this.childNodes[2]).attr("src", gifResults[i].images.fixed_height.url);
                            $(this.childNodes[1]).attr("src", gifResults[i].images.fixed_height.url);
                        }
                        if(firstNode === gifResults[i].images.fixed_height.url || secondNode === gifResults[i].images.fixed_height.url){
                            $(this.childNodes[2]).attr("src", gifResults[i].images.fixed_height_still.url);
                            $(this.childNodes[1]).attr("src", gifResults[i].images.fixed_height_still.url);
                        }
                        }
                    });
                    $("#deleteFavItem").on("click", function(){
                        console.log(this);
                        favDiv.remove();
                    });
                });
    
    
                //code for setting up an array for when we add more gifs to the original 10 
                if(moreGifsArray.length === 0){
                moreGifsArray.push(topicName);
            
                } else {
                    moreGifsArray.splice(0,1);
                    moreGifsArray.push(topicName);
                
                }
                
            });     
    });
});


$(".addMoreGifs").on("click", function() {    
        limit = limit + 10;
        var newQueryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        moreGifsArray[0] + "&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit="+ limit;
        
       $.ajax({
            url: newQueryURL,
            method: "GET"
            }).then(function(response) {
                var addedGifResults = response.data;
                for (var i = limit-10; i < limit; i++) {
                    divClassCtr++;
                    favClassCtr++;
                    var newDiv = $("<div>");
                    var ratingParagraph = $("<p>").text("Rating: " + addedGifResults[i].rating);
                    var downloadButton = $("<button>");
                    var newDownloadGif = $("<a>");
                    downloadButton.addClass("newdownloadButton mb-2");
                    downloadButton.attr("data-name", addedGifResults[i].title);
                    downloadButton.attr("newcounter", favClassCtr);
                    downloadButton.text("♡");
                    var titleParagraph = $("<p>").text(addedGifResults[i].title);
                    var gifImage= $("<img>");
                    gifImage.addClass("newGif");
                    titleParagraph.addClass("gifTitle pt-2 pr-1")
                    gifImage.attr("src", addedGifResults[i].images.fixed_height_still.url);
                    newDownloadGif.attr("download");
                    newDownloadGif.addClass("ml-3");
                    newDownloadGif.attr("target", "_blank");
                    newDownloadGif.attr("href", addedGifResults[i].images.fixed_height.url);
                    newDownloadGif.text("download");
                    newDiv.addClass("float-left border m-1");
                    newDiv.attr("newcounter", divClassCtr);
                    newDiv.append(titleParagraph);
                    newDiv.append(gifImage);
                    newDiv.append(ratingParagraph);
                    newDiv.append(downloadButton);
                    newDiv.append(newDownloadGif);
                    favArray.push(newDiv);
                    $("#gifBox").append(newDiv);
        
                    if(addedGifResults[i].title === ""){
                        titleParagraph = $("<p>").text("**No Title Available**");
                        titleParagraph.addClass("gifTitle pt-2")
                        newDiv.prepend(titleParagraph);
                    }
                }
                $(".newGif").on("click", function() {
                    var source = $(this).attr("src");
                        for(var i = 0; i < addedGifResults.length; i++) {
                        if(source === addedGifResults[i].images.fixed_height_still.url){
                            $(this).attr("src", addedGifResults[i].images.fixed_height.url);
                        }
                        if(source === addedGifResults[i].images.fixed_height.url){
                            $(this).attr("src", addedGifResults[i].images.fixed_height_still.url);
                        }
                    }
                });
                $(".newdownloadButton").one("click", function() {
                    var addedFavDiv = $("<div>");
                    var newCtrAttr = $(this).attr("newcounter");
                    var deleteFavButton = $("<button>");
                    if(favGifs.length > 0){
                        favGifs.splice(0,1);
                    }
                    for(var i=0; i < favArray.length; i++){
                    if(newCtrAttr === favArray[i].attr("newcounter")){
                        var newCopyDiv = favArray[i].clone();
                        $(newCopyDiv).attr("id", "addedAnimateFavGif");
                        deleteFavButton.text("X");
                        deleteFavButton.attr("id", "deleteFavItem");
                        deleteFavButton.addClass("float-left border-left-0");
                        addedFavDiv.append(newCopyDiv);
                        addedFavDiv.append(deleteFavButton);
                        favGifs.push(addedFavDiv);
                        $("#favorites").prepend(favGifs);
                   }
                }
                
                $("#addedAnimateFavGif").on("click", function() {
                    var addedSecondNode = $(this.childNodes[2]).attr("src");
                    var addedFirstNode = $(this.childNodes[1]).attr("src");
                    for(var i = 0; i < addedGifResults.length; i++) {
                    if(addedFirstNode === addedGifResults[i].images.fixed_height_still.url || addedSecondNode === addedGifResults[i].images.fixed_height_still.url){
                        $(this.childNodes[2]).attr("src", addedGifResults[i].images.fixed_height.url);
                        $(this.childNodes[1]).attr("src", addedGifResults[i].images.fixed_height.url);
                    }
                    if(addedFirstNode === addedGifResults[i].images.fixed_height.url || addedSecondNode === addedGifResults[i].images.fixed_height.url){
                        $(this.childNodes[2]).attr("src", addedGifResults[i].images.fixed_height_still.url);
                        $(this.childNodes[1]).attr("src", addedGifResults[i].images.fixed_height_still.url);
                    }
                    }
                });
                $("#deleteFavItem").on("click", function(){
                    console.log(this);
                    addedFavDiv.remove();
                });
              });
            });
});
    
$(".submitSportsButton").on("click", function(){
    event.preventDefault();
    
    remakeSportsButtons();
});

$(".submitCarsButton").on("click", function(){
    event.preventDefault();
    
    remakeCarsButtons();
});
 
});
