$(document).ready(function() { 

var cityName =  []; 


$("#add-city").on("click", function(event) {
    event.preventDefault();
    var city= $("#city-input").val().trim();
    console.log(city);
    cityName.push(city);
    localStorage.setItem(cityName, cityName);
    localStorage.getItem(cityName);
    
    // renderListItems();
    
    // for (var i = 0; i < cityName.length; i++) {
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
        $("#cityList").append(a);
    
});


function displayWeatherInfo(event, element) {
    // console.log(event, element)
    var APIKey = "889cd95742cb4d318b134906ce82bcb0";
    var city = $(element).text();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        // console.log(response);

        $(".currentCityName").append(response.name);
        $("#temp").append("Temperature: " + response.main.temp);
        $("#windSpeed").append("Wind Speed: " + response.wind.speed + " mph");
        $("#humidity").append("Humidity: " +response.main.humidity);

        var iconEl = response.weather[0].icon;
        var cityIconUrl = "http://openweathermap.org/img/w/" + iconEl + ".png";
        
        $("#cityIconUrl").attr("src", cityIconUrl);

        var lon =response.coord.lon;
        var lat = response.coord.lat;

        
        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
          url: queryURL2,
          method: "GET"
        }).then(function(response2) {
        $("#uvIndex").append("UV Index: " + response2.value); 

          var index = parseInt(parseFloat(response2.value));
          console.log(index);

        if (index < 3) {
        $(uvIndex).addClass("favorable")
        } else if (index > 7) {
          $(uvIndex).addClass("severe")
        } else {
          $(uvIndex).addClass("moderate")
        }


    });

  })
  }
})