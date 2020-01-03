var weatherApiKey = "44b3433340eb70a32f38740161f053dc"; //

function currentWeather() {
  var citySearch = "Lehi";
  var currentWeatherQuery =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySearch +
    "&APPID=" +
    weatherApiKey;

  $.ajax({
    url: currentWeatherQuery,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
}
