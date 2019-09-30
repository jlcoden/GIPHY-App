var topics = ["Cat", "Dog", "Cow", "Sheep", "Moose", "Lion", "Turtle", "Pig", "Bear", "Giraffe", "Platypus", "Zebra"];

  //document wrapper 
  $(document).ready(function() {


// displaytopicInfo function re-renders the HTML to display the  content
function displayTopicInfo() {

  $("#topics-view").empty();

  //parameters that make up the queryURL
  var topic = $(this).attr("data-name");
  var api = 'https://api.giphy.com/v1/gifs/search?';
  var limit = '&limit=10';
  var key = 'api_key=ZX2nFAngcwSZ3yPNLC9dFOA7jWxaU0X1&q=';
  var rating = '&rating=G';

  //queryURL variable
  var queryURL = api + key + topic + limit + rating;


  console.log(topic); 
  console.log(queryURL); 

  // AJAX call for the specific for the topic button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var results = response.data; 

   for (var i = 0; i < results.length; i++) {

//     // Creating a div to hold the topic
     var topicDiv = $("<div class='topic'>");

//     // Storing the rating data
      var rating = results[i].rating;

//     // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);
    
      //console.log rating
      console.log(rating); 

//     // Displaying the rating
       topicDiv.append(pOne);

//     // Retrieving the URL for the image
       var imgURL = results[i].images.original_still.url;

//     // Creating an element to hold the image
       var image = $("<img>")
       image.attr({
       "src": imgURL,
				"data-still": results[i].images.original_still.url,
				"data-animate": results[i].images.original.url,
				"data-state": "still",
        "class": "gif"
      //  "src", imgURL
      });

     // image.attr("src", imgURL);
     // image.attr("alt", "topic image");

       // Setting the image src attribute to imageUrl
       
      // Appending the image
      topicDiv.append(image);

     // Putting the entire topic above the previous topics
     $("#topics-view").prepend(topicDiv);
    }
   });

 }


 // Function for displaying topic data
 function renderButtons() {
   // Deleting the topics prior to adding new topics
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

//   // Looping through the array of topics
   for (var i = 0; i < topics.length; i++) {

     // Then dynamicaly generating buttons for each topic in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
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



 // });

// // This function handles events where a topic button is clicked
 $("#add-topic").on("click", function(event) {
   event.preventDefault();
//   // This line grabs the input from the textbox
   var topic = $("#topic-input").val().trim();

//   // Adding topic from the textbox to our array
   topics.push(topic);


 //   // Calling renderButtons which handles the processing of our topic array
 renderButtons();

});

// // Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displayTopicInfo);

// // Calling the renderButtons function to display the intial buttons
renderButtons();
});

$(document).on("click", ".gif", function() {

//$(".gif").on("click", function() {

  console.log("gif clicked"); 
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
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
  

});

