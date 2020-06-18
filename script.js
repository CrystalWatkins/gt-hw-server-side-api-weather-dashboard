$(document).ready(function() { 

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

$("#add-city").on("click", function(event) {
    event.preventDefault();

    var city= $("#city-input").val().trim();
    if (!localStorage.searchedCityList){
      let cityList = []
      cityList.push(city)
      localStorage.setItem("searchedCityList", JSON.stringify(cityList));
    } else {
      let cityList = JSON.parse(localStorage.getItem("searchedCityList"));
      cityList.push(city);
      localStorage.setItem("searchedCityList", JSON.stringify(cityList));
    };
    
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
  clearJumbotron();
  clearCards(1,2,3,4,5);

   console.log(event);
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
        $("#temp").append("Temperature: " + response.main.temp + "°F");
        $("#windSpeed").append("Wind Speed: " + response.wind.speed + " mph");
        $("#humidity").append("Humidity: " +response.main.humidity + "%");

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
      
        $("#cityIndex").append("UV Index: ").append($("#uvIndex").append(response2.value));
          var index = parseInt(parseFloat(response2.value));
          console.log(index);

        if (index < 3) {
          $("#uvIndex").addClass("favorable")
        } else if (index > 7) {
          $("#uvIndex").addClass("severe")
        } else {
          $("#uvIndex").addClass("moderate")
        }
    });


   var queryURL3= "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
   $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function(response3) {
    console.log(response3);
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

function clearJumbotron() {
  console.log("clear jumbo")
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

