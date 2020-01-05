var weatherApiKey = "44b3433340eb70a32f38740161f053dc"; //
var citySearch = localStorage.getItem("citySearchLast");
var cityArray = JSON.parse(localStorage.getItem("citiesSearched"));
if (cityArray === null) {
	cityArray = [];
}
if (citySearch === null) {
	citySearch = "";
}

function currentWeather() {
	var currentWeatherQuery =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		citySearch +
		"&APPID=" +
		weatherApiKey + "&units=imperial";

	$.ajax({
		url: currentWeatherQuery,
		method: "GET"
	}).then(function (response) {
		var icon = response.weather[0].icon;
		var weatherDesc = response.weather[0].description;
		var weatherMain = response.weather[0].main;
		var date = moment.unix((response.dt)).format("dddd, MMMM Do YYYY");
		var temp = response.main.temp;
		var humidity = response.main.humidity;
		var windSpeed = response.wind.speed;
		var lat = response.coord.lat;
		var lon = response.coord.lon;
		var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + weatherApiKey + "&lat=" + lat + "&lon=" + lon;
		$.ajax({
			url: uvQueryURL,
			method: "GET"
		}).then(function (uvReturn) {
			var uv = uvReturn.value;
			var cityLabel = $("<h2>").html(citySearch);
			var dateDisplay = $("<h3>").text(date);
			var weatherIcon = $("<img>").attr({
				src: "http://openweathermap.org/img/w/" + icon + ".png",
				alt: weatherMain,
			});
			var weatherDesc2 = $("<p>").text(weatherDesc);
			var tempDisp = $("<p>").text("Temperature: " + temp + "°F");
			var humidityDisp = $("<p>").text("Humidity: " + humidity + "%");
			var wind = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
			var uvSpan = "";
			if (parseFloat(uv) <= 2) {
				uvSpan = "<span class='bg-success rounded p-1'>" + uv + "</span>";
			} else if (parseFloat(uv) <= 5) {
				uvSpan = "<span class='bg-warning rounded p-1'>" + uv + "</span>";
			} else if (parseFloat(uv) <= 7) {
				uvSpan = "<span class='bg-high rounded p-1'>" + uv + "</span>";
			} else if (parseFloat(uv) <= 10) {
				uvSpan = "<span class='bg-danger rounded p-1 text-white'>" + uv + "</span>";
			} else {
				uvSpan = "<span class='bg-extreme rounded p-1 text-white'>" + uv + "</span>";

			}
			var uvDisp = $("<p>").html("UV Index: " + uvSpan)
			$("#current-weather").append(cityLabel, dateDisplay, weatherIcon, weatherDesc2, tempDisp, humidityDisp, wind, uvDisp);
		});
	});
};


function forecastWeather() {
	var forcastWeatherQuery =
		"https://api.openweathermap.org/data/2.5/forecast?q=" +
		citySearch +
		"&APPID=" +
		weatherApiKey + "&units=imperial";

	$.ajax({
		url: forcastWeatherQuery,
		method: "GET"
	}).then(function (forecast) {
		var header = $("<h2>").html("Five Day Forecast:");
		$(header).attr("class", "col-12")
		$("#header").append(header);
		console.log(forecast);
		for (i = 7; i < forecast.list.length; i += 8) {
			var response = forecast.list[i];
			var icon = response.weather[0].icon;
			var weatherDesc = response.weather[0].description;
			var weatherMain = response.weather[0].main;
			var date = moment.unix((response.dt)).format("dddd, MMMM Do YYYY");
			var temp = response.main.temp;
			var humidity = response.main.humidity;
			var windSpeed = response.wind.speed;
			var cityLabel = $("<h2>").html(citySearch);
			var dateDisplay = $("<h3>").text(date);
			var weatherIcon = $("<img>").attr({
				src: "http://openweathermap.org/img/w/" + icon + ".png",
				alt: weatherMain,
			});
			var weatherDesc2 = $("<p>").text(weatherDesc);
			var tempDisp = $("<p>").text("Temperature: " + temp + "°F");
			var humidityDisp = $("<p>").text("Humidity: " + humidity + "%");
			var wind = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
			var col = $("<div>").attr({
				class: "col bg-info rounded p-2 m-1"
			})
			$(col).append(dateDisplay, weatherIcon, weatherDesc2, tempDisp, humidityDisp, wind, )
			$("#forecast").append(col);

		};
	});
};

function addCityButtons() {
	$("#cities-searched").empty();

	for (i = 0; i < cityArray.length; i++) {
		var city = $("<button>");
		city.addClass("btn btn-outline-info");
		city.attr("data-city", cityArray[i]);
		city.text(cityArray[i]);
		$("#cities-searched").prepend(city);
	}

}

$("#find-city").on("click", function (event) {
	event.preventDefault();
	var city = $("#city").val().trim();
	if (city !== "") {
		$("#current-weather").empty();
		citySearch = city;
		if (cityArray.indexOf(city) === -1) {

			cityArray.push(city);
		}
		currentWeather();
	}

	addCityButtons();
	localStorage.setItem("citiesSearched", JSON.stringify(cityArray));
	localStorage.setItem("citySearchLast", city);
})

addCityButtons();
currentWeather();
forecastWeather();