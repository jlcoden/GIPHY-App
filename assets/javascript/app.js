//array of topics
var topics = ["Cat", "Dog", "Cow", "Sheep", "Moose", "Lion", "Turtle", "Pig", "Bear", "Giraffe", "Platypus", "Zebra"];

  //document wrapper 
  $(document).ready(function() {


// displaytopicInfo function re-renders the HTML to display the content
function displayTopicInfo() {

    //start by making sure topics-view div is empty
    $("#topics-view").empty();

  //parameters that make up the queryURL for the GIPHY API
  var topic = $(this).attr("data-name");
  var api = 'https://api.giphy.com/v1/gifs/search?';
  var limit = '&limit=10';
  var key = 'api_key=ZX2nFAngcwSZ3yPNLC9dFOA7jWxaU0X1&q=';
  var rating = '&rating=G';

  //queryURL variable
  var queryURL = api + key + topic + limit + rating;

  //console.log topic and queryURL for debugging
  console.log(topic); 
  console.log(queryURL); 

  // AJAX call for the specific topic button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data; 

     for (var i = 0; i < results.length; i++) {

    // Creating a div to hold the topic
     var topicDiv = $("<div class='topic'>");

     // Storing the rating data
      var rating = results[i].rating;

      //storing the GIF title
      var title = results[i].title;

    // Creating an element to have the rating displayed
      var pRating = $("<p id ='pRating'></div>").text("Rating: " + rating);
    
    //creating an element to have the title displayed
      var pTitle = $("<p id = 'pTitle'></div>").text("Title: " + title);
    
      //console.log rating
      console.log(rating); 

      // Displaying the rating in HTML
       topicDiv.append(pRating);
     // Displaying the title in HTML
       topicDiv.append(pTitle);

     // Retrieving the URL for the image
       var imgURL = results[i].images.original_still.url;

      // Creating an element to hold the image
       var image = $("<img>")
       image.attr({
          "src": imgURL,
          "data-still": results[i].images.original_still.url,
          "data-animate": results[i].images.original.url,
          "data-state": "still",
          "class": "gif"
      });

      // Appending the image
      topicDiv.append(image);

     // Putting the entire topic above the previous topics
     $("#topics-view").prepend(topicDiv);
    }
   });

 }


 // Function for rendering the buttons of topics
 function renderButtons() {
   // Deleting the topics prior to adding new topics
   $("#buttons-view").empty();

   // Looping through the array of topics
   for (var i = 0; i < topics.length; i++) {

     // Then dynamicaly generating buttons for each topic in the array
     var a = $("<button>");
     // Adding a class of topic-btn to our button
     a.addClass("topic-btn");
    // Adding a data-attribute
     a.attr("data-name", topics[i]);
     // Providing the initial button text
     a.text(topics[i]);
     
     // Adding the button to the buttons-view div
     $("#buttons-view").append(a);
  
   }
   

  }


 // This function handles events where a topic button is clicked
 $("#add-topic").on("click", function(event) {

    //when the topic button is clicked, check to make sure text input is provided
    if ($.trim($("#topic-input").val()) === "") {
        //if no text input, alert user they did not enter in a word
        alert('You did not provide a word');
        return false;
    } else{

   event.preventDefault();
   // grab the input from the textbox
   var topic = $("#topic-input").val().trim();

  // add topic from the textbox to the array
   topics.push(topic);


 //call renderButtons which handles the processing of the topic array
     renderButtons();
    }

});

//Click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displayTopicInfo);

// // Calling the renderButtons function to display the intial buttons
renderButtons();

//end of document wrapper
});

//click lister for on document, when clicked it will animate the GIF
$(document).on("click", ".gif", function() {

  //console.log for debugging
  console.log("gif clicked"); 
  // get the value of any attribute on the data-state element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
  
//end of document on click function
});

