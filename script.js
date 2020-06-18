$(document).ready(function() { 
// by creating this if statement, I am able to save all items to the
// page and when it refreshes, the list items (in this case, cities 
// entered) will stay on the page and styled correctly as seen in lines 8-16
  if(localStorage.getItem("searchedCityList")) {
    let cityArray = JSON.parse(localStorage.getItem("searchedCityList"));
    for (var i = 0; i < cityArray.length; i++) {
      var a = $("<li>", {
        class: "list-group-item",
        click: function()
        {displayWeatherInfo(event, this);}
    })
    a.addClass("city");
    a.attr("data-name", cityArray[i]);
    a.text(cityArray[i]);
    $("#cityList").prepend(a);
    }
  } 


// when you click enter on the page after typing in a city, this starts the program below
$("#add-city").on("click", function(event) {
    event.preventDefault();
// this creates a variable for the city that you are entering in the text box
    var city= $("#city-input").val().trim();
    // this if statement is storing the information to the local storage-
    // we are storing it in an array (either starting an array or adding to the 
    // array) we are creating the array to be used and stored above in lines 5-16
    if (!localStorage.searchedCityList){
      let cityList = []
      cityList.push(city)
      localStorage.setItem("searchedCityList", JSON.stringify(cityList));
    } else {
      let cityList = JSON.parse(localStorage.getItem("searchedCityList"));
      cityList.push(city);
      localStorage.setItem("searchedCityList", JSON.stringify(cityList));
    };

    // we are creating a variable for how to style each one of the list group items and what
    // is being displayed on each of these elements/ list group items is the city that was entered
        var a = $("<li>", {
            class: "list-group-item",
            click: function(){
                //when you console.log it shows when it's clicked, which city is being clicked
                // console.log($(this));
                //this passes this element in this argument
                displayWeatherInfo(event, this);
            }
        })
        a.addClass("city");
        a.attr("data-name", city);
        a.text(city)
        $("#cityList").prepend(a);
      });

// So this is displaying the weather info when you click on a city!
function displayWeatherInfo(event, element) {
  // this is calling the functions at the bottom of the entire function
  // so that when you are clicking to display the new city, the old city, goes away
  clearJumbotron();
  clearCards(1,2,3,4,5);

   console.log(event);
    // console.log(event, element) 
    var APIKey = "889cd95742cb4d318b134906ce82bcb0";
    var city = $(element).text();
    // this is using out API key to get the weather for the current city to display
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);
        // This is grabbing the elements from the API and displaying them on the page
        // again, the ID's are hard coded in the HTML so that they display exactly
        // as I want them to on the page
        $(".currentCityName").append(response.name);
        $("#temp").append("Temperature: " + response.main.temp + "°F");
        $("#windSpeed").append("Wind Speed: " + response.wind.speed + " mph");
        $("#humidity").append("Humidity: " +response.main.humidity + "%");

        // the weather icon needs the url and is displayed in the three lines below
        // when you console.log, it only sends back a string, which is not the pretty
        // image the user wants displayed!
        var iconEl = response.weather[0].icon;
        var cityIconUrl = "http://openweathermap.org/img/w/" + iconEl + ".png";
        $("#cityIconUrl").attr("src", cityIconUrl);
        // by creating variables for the longitude and latiutde, I'm able to get my
        // UV index in lines 93
        var lon =response.coord.lon;
        var lat = response.coord.lat;
        // this calls the second URL function that gets us the UV index
        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
          url: queryURL2,
          method: "GET"
        }).then(function(response2) {
          // we are adding this to the span UV index, but we have to also add a styling
          // element, so that it only styles the background color for the number of the UV
          //index, which is given to it in the if statement in line 106-111
        $("#cityIndex").append("UV Index: ").append($("#uvIndex").append(response2.value));
          var index = parseInt(parseFloat(response2.value));
          console.log(index);
          // in this statement, we are adding background color to the UV index depending
          // on what number the UV index is, indicating to the user if we the conditions are 
          //severe, moderate, or favorable
        if (index < 3) {
          $("#uvIndex").addClass("favorable")
        } else if (index > 7) {
          $("#uvIndex").addClass("severe")
        } else {
          $("#uvIndex").addClass("moderate")
        }
    });
    // this third URL is getting our data for the 5 day forecast
   var queryURL3= "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
   $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function(response3) {
    console.log(response3);
    // originally, I was going to create a for loop for the elements, but 
    // i realized, that the API actually gives us hour time blocks, so the 
    // responses are not in correct array from the list (0,1,2,3, etc, but rather
    // in increments on 8) again, I hard coded them on the page so that they would
    // show up correctly on the page and in the correct box/ with correct styling
    $("#date1").append(response3.list[0].dt_txt.split(" ")[0]);
    $("#temp1").append("Temp: " + response3.list[0].main.temp + "°F");
    $("#humidity1").append("Humidity: " + response3.list[0].main.humidity+ "%");

    var icon1El = response3.list[0].weather[0].icon;
    var icon1Url = "http://openweathermap.org/img/w/" + icon1El + ".png";
    $("#icon1").attr("src", icon1Url);


    $("#date2").append(response3.list[8].dt_txt.split(" ")[0]);
    $("#temp2").append("Temp: " + response3.list[8].main.temp + "°F");
    $("#humidity2").append("Humidity: " + response3.list[8].main.humidity+ "%");

    var icon2El = response3.list[8].weather[0].icon;
    var icon2Url = "http://openweathermap.org/img/w/" + icon2El + ".png";
    $("#icon2").attr("src", icon2Url);

    $("#date3").append(response3.list[16].dt_txt.split(" ")[0]);
    $("#temp3").append("Temp: " + response3.list[16].main.temp + "°F");
    $("#humidity3").append("Humidity: " + response3.list[16].main.humidity+ "%");

    var icon3El = response3.list[16].weather[0].icon;
    var icon3Url = "http://openweathermap.org/img/w/" + icon3El + ".png";
    $("#icon3").attr("src", icon3Url);

    $("#date4").append(response3.list[24].dt_txt.split(" ")[0]);
    $("#temp4").append("Temp: " + response3.list[24].main.temp + "°F");
    $("#humidity4").append("Humidity: " + response3.list[24].main.humidity+ "%");

    var icon4El = response3.list[24].weather[0].icon;
    var icon4Url = "http://openweathermap.org/img/w/" + icon4El + ".png";
    $("#icon4").attr("src", icon4Url);

    $("#date5").append(response3.list[32].dt_txt.split(" ")[0]);
    $("#temp5").append("Temp: " + response3.list[32].main.temp + "°F");
    $("#humidity5").append("Humidity: " + response3.list[32].main.humidity+ "%");

    var icon5El = response3.list[32].weather[0].icon;
    var icon5Url = "http://openweathermap.org/img/w/" + icon5El + ".png";
    $("#icon5").attr("src", icon5Url);
  })
  });
  }
// this function is clearing out all of the elements on the page without clearing the
// styles and tags that are needed to format the page for the next display of information
// when we did empty/ clear, this was not clearing as it was clearing above, so this is a
// way around the code to make that happen!
function clearJumbotron() {
  console.log("clear jumbo")
  //I ended up creating a span and image variable, because these wrapped around the specific
  //IDs that I had, so I had to re-create them here while they were being cleared so that they
  // would still exist and format the page correctly
  var img = "<img id='cityIconUrl'>";
  var span = "<span id='uvIndex' class='badge badge-secondary'></span>"

  $(".currentCityName").text("").html(img);
  $(".cityIconUrl").attr("src", "");
  $("#temp").text("");
  $("#humidity").text("");
  $("#windSpeed").text("");
  $("#uvIndex").text("");
  $("#cityIndex").text("").html(span);
}
// this is clearing the cards. I found what we can use as spread syntax, so that
// I did not have to clear out each set of data that was hard coded above to fit 
// in each card. by running this for-loop, I am able to clear out the text in all of 
// the variables at once, since I just changed the number at the end of each ID
// Because I started with ID 1/ day 1, I have to add a 1 to my array since it starts at 0
function clearCards(...cards) {
  console.log(cards);
  for (var i=0; i < cards.length; i++) {
    console.log(i);
    $("#date" + (i + 1)).text("");
    $("#temp" + (i + 1)).text("");
    $("#humidity" + (i + 1)).text("");
    $("#icon" + (i + 1)).attr("src", "")
  }
}


})

