var lastCitySearched =$(".lastCitySearched");
        lastCitySearched.append(city);
        lastCitySearched.append(icon);
        lastCitySearched.append(temp);
        lastCitySearched.append(wind);
        lastCitySearched.append(humidity);
        lastCitySearched.append(longitude);
        lastCitySearched.append(latitude);
        <h2 class="display-4 currentCityName"></h2>
        <hr class="my-4">
        <p id = "temp"></p>
        <p id = "humidity"></p>
        <p id = "windSpeed"></p>
        <p id = "uvIndex"></p>

        $(".currentCity").append(cityDiv)

    var lon =
    var lat = 
    var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + API key + "&lat=" + lat "&lon=" + lon;
    $.ajax({
    url: queryURL2,
    method: "GET"
    }).then(function(response) {
    console.log(response); }
