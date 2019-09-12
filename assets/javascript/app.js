$(document).ready(function(){
//Buttons will store into local
  var storageTopic = localStorage.getItem("searchTopics");
  var gifTopic = storageTopic ? storageTopic.split(",") : [];
 
  
  function display() { 
    for (let i = 0; i < gifTopic.length; i++) {
    var btn=$("<button type ='button'>");
    btn.addClass("btn btn-primary btn-sm");
    btn.attr("value", gifTopic[i]);
    btn.text(gifTopic[i]);
    $("#addButton").append(btn);  
    localStorage.setItem("searchTopics", gifTopic);
    console.log(gifTopic);
  }    
    
  }

  display();

//Started with adding one button each time from no button
  $("#add-gif").on("click",function () {
    var userInput = $("#gif-input").val().trim();
    if(userInput!=="" && gifTopic.indexOf(userInput)===-1){
    gifTopic.push(userInput);
    $("#addButton").empty();
    display();
   
    }    
  })	  
})


//get API data

$(document).on("click", ".btn", function() {

  var gifItem = $(this).val();
   
      $("#gifs-appear-here").empty()
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gifItem + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=5";
      //
    
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
   
          var results = response.data;
          $( "button" ).click(function() {
          });

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div id ='pic'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");

            // add states of animate and still which will be toggled 
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url)
            gifImage.attr("data-state", "still")
            gifImage.addClass("gif");

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);
            console.log(gifDiv);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
      // }
      });

      $(document).on("click", "#reset", function(event){
        localStorage.clear();
        location.reload(true);
      })

      $("#gifs-appear-here").on("click", ".gif", function(event){
        event.preventDefault();        
        var state = $(this).attr("data-state");
          if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      
      })
