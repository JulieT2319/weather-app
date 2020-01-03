var weatherApiKey = "44b3433340eb70a32f38740161f053dc"; //
var citySearch = "";
var cityArray = [];

function currentWeather() {
	var currentWeatherQuery =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		citySearch +
		"&APPID=" +
		weatherApiKey;

	$.ajax({
		url: currentWeatherQuery,
		method: "GET"
	}).then(function (response) {
		console.log(response);
	});
}

function addCityButtons() {
	$("#cities-searched").empty();

	for (i = 0; i < cityArray.length; i++) {
		var city = $("<button>");
		city.addClass("btn btn-outline-info");
		city.attr("data-city", cityArray[i]);
		city.text(cityArray[i]);
		$("#cities-searched").append(city);

	}

}

