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


function displayWeatherInfo(event, element) {

    // console.log(event, element)
    var APIKey = "889cd95742cb4d318b134906ce82bcb0";
    var city = $(element).text();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);

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


   var queryURL3= "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
   $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function(response3) {
    console.log(response3);
    $("#date1").append("Date: " + response3.list[0].dt_txt);
    $("#temp1").append("Temp: " + response3.list[0].main.temp);
    $("#humidity1").append("Humidity: " + response3.list[0].main.humidity);

    var icon1El = response3.list[0].weather[0].icon;
    var icon1Url = "http://openweathermap.org/img/w/" + icon1El + ".png";
    $("#icon1").attr("src", icon1Url);


    $("#date2").append("Date: " + response3.list[1].dt_txt);
    $("#temp2").append("Temp: " + response3.list[1].main.temp);
    $("#humidity2").append("Humidity: " + response3.list[1].main.humidity);

    var icon2El = response3.list[1].weather[0].icon;
    var icon2Url = "http://openweathermap.org/img/w/" + icon2El + ".png";
    $("#icon2").attr("src", icon2Url);

    $("#date3").append("Date: " + response3.list[2].dt_txt);
    $("#temp3").append("Temp: " + response3.list[2].main.temp);
    $("#humidity3").append("Humidity: " + response3.list[2].main.humidity);

    var icon3El = response3.list[2].weather[0].icon;
    var icon3Url = "http://openweathermap.org/img/w/" + icon3El + ".png";
    $("#icon3").attr("src", icon3Url);

    $("#date4").append("Date: " + response3.list[3].dt_txt);
    $("#temp4").append("Temp: " + response3.list[3].main.temp);
    $("#humidity4").append("Humidity: " + response3.list[3].main.humidity);

    var icon4El = response3.list[3].weather[0].icon;
    var icon4Url = "http://openweathermap.org/img/w/" + icon4El + ".png";
    $("#icon4").attr("src", icon4Url);

    $("#date5").append("Date: " + response3.list[4].dt_txt);
    $("#temp5").append("Temp: " + response3.list[4].main.temp);
    $("#humidity5").append("Humidity: " + response3.list[4].main.humidity);

    var icon5El = response3.list[4].weather[0].icon;
    var icon5Url = "http://openweathermap.org/img/w/" + icon5El + ".png";
    $("#icon5").attr("src", icon5Url);
  })

  });



  }
})