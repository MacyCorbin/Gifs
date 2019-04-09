jQuery(document).ready(function(){

    // Initial array of animals
    var topics = ["Tiger", "Quokka", "Pangolin","Pallas Cat"];

    // displayAnimalInfo function re-renders the HTML to display the appropriate content
    function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=2Raf89UCLcI76bv0dTzcRkNBqSTRxEHy&limit=10";

    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        for(var i = 0; i< response.data.length; i++){

            // Creating a div to hold the animal
            var animalDiv = $("<div class='animal'>");

            // Retrieving the URL for the image
            var imgURL = response.data[i].images.fixed_height_still.url;

            // Creating an element to hold the image
            var image = $("<img class='gif'>").attr("src", imgURL);

            // Appending the image
            animalDiv.append(image);

            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p class='ratingText'>").text("Rating: " + rating);

            // Displaying the rating
            animalDiv.append(pOne);

            // Putting the entire animal above the previous topics
            $("#animals-view").prepend(animalDiv);

        }
    });

    }

    // Function for displaying animal data
    function renderButtons() {

    // Deleting the animals prior to adding new animals
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button type='button' id='buttonStyle'>");
        // Adding a class of animal-btn to our button
        a.addClass("animal-btn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
        $('.animal-btn').css({"margin":"10px"});
    }
    }

    // This function handles events where a animal button is clicked
    $("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding animal from the textbox to our array
    topics.push(animal);

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
    });

    // Adding a click event listener to all elements with a class of "animal-btn"
    $(document).on("click", ".animal-btn", displayAnimalInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    

    $('body').on('click', '.gif', function() {
        var src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });
    
});