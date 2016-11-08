var unit = "metric";
var unitsC = "&units=metric";
var unitsF = "&units=imperial";
var APPID = "&APPID=885c04db54ec1ecabbf6774a4e1e7400";
var w = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?";

$(document).ready(function() {
  if (geoAvailable) {
    setData("metric");
  } else {
    $('#city').html("Geolocation not available");
  }
  $('body').on('click', 'a', function() {
    if (unit == "metric") {
      unit = "imperial";
      setData(unit);
    } else {
      unit = "metric";
      setData(unit);
    }
    return false;
  });
});
//check whether geolocation is available in browser
function geoAvailable() {
  return (navigator.geolocation);
}
//if geolocation available, sets data for current weather with desired units
function setData(units) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      //retrieves coords
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      //call owm api
      $.getJSON(getApiUrl(lat, lon, units), function(data) {
        //prints json response from owm in console
        console.log(getApiUrl(lat, lon, units));
        console.log(JSON.stringify(data, null, "\t"));
        //sets city name with country code
        $("#city").html(data.name + ", " + data.sys.country);
        //sets weather description
        $("#w_text").html(capitalize(data.weather[0].description));
        //sets rounded temperature with chosen units
        if (units == "metric")
          $("#temp").html(Math.round(data.main.temp) + " <a>&degC</a>");
        else
          $("#temp").html(Math.round(data.main.temp) + " <a>&degF</a>");
        //sets weather icon (weather code adequate to icon - check weather icon library)
        $("#w_icon").addClass("wi-owm-" + data.weather[0].id);
        //removes loading spinner div
        $('.load-spinner').remove();
      });
    });
}
//return string with the right json request for given coords
function getApiUrl(latitude, longitude, units) {
  if (units == "imperial") {
    return w + "lat=" + latitude + "&lon=" + longitude + unitsF + APPID;
  } else if (units == "metric")
    return w + "lat=" + latitude + "&lon=" + longitude + unitsC + APPID;
  else
    return w + "lat=" + latitude + "&lon=" + longitude + APPID;
}
//returns string with first letter capital
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}