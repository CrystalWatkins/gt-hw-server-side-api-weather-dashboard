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
                console.log($(this));
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
    console.log(event, element)
    var APIKey = "889cd95742cb4d318b134906ce82bcb0";
    var city = $(element).text();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);
        $("<h2 id='city'>").text("City:" + response.name);
        // $("<p id='icon'>").attr("icon: " + response.weather[0].icon)
        $("<p>").text("temp" + response.main.temp);
        $("<p>").text(" Wind" + response.wind);
        $("<p>").text("Humidity" +response.main.humidity);
        $("<p>").text("Longitude" + response.coord.lon);
        $("<p>").text("Latitude" +response.coord.lat);
        // var lastCitySearched =$(".lastCitySearched");
        // lastCitySearched.append(city);
        // lastCitySearched.append(icon);
        // lastCitySearched.append(temp);
        // lastCitySearched.append(wind);
        // lastCitySearched.append(humidity);
        // lastCitySearched.append(longitude);
        // lastCitySearched.append(latitude);

      })
    }

    // var lon =
    // var lat = 
    // var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + API key + "&lat=" + lat "&lon=" + lon;
    // $.ajax({
    //     url: queryURL2,
    //     method: "GET"
    //   }).then(function(response) {
    //     console.log(response);

    //   })

