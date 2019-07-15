var tempCel = " ";
var tempFah = " ";
var windDir = " ";
var tempH = " ";
var tempL = " ";
var tempC = " ";
var btnPress = false;

$("#sub").on("click", function() {
  if ($("#zip").val().length != 5) {
    $("#errorOutput").html("Not a valid zip code");
  }
  else {
    $("#errorOutput").html(" ");
    $.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?&",
    dataType: "json",
    data: { "zip" : $("#zip").val(), "APPID" : "6deab055344dbb5a5e4098bf74aa4882"},
    success: function(result, status) {
      btnPress = true;
      $("#city").html(result.name);
      $("#lat").html(result.coord.lat);
      $("#lon").html(result.coord.lon);
      $("#high").html(result.main.temp_max + " &#8490");
      $("#curr").html(result.main.temp + " &#8490");
      $("#low").html(result.main.temp_min + " &#8490");
      $("#hum").html(result.main.humidity + " &#37");
      $("#windSpeed").html(result.wind.speed + " mps");
      determineWindDirection(result.wind.deg)
      $("#windDirection").html(windDir);
      $("#weatherType").html(result.weather[0].description);
      tempH = result.main.temp_max;
      tempL = result.main.temp_min;
      tempC = result.main.temp;
    }
  });
  }
  
});
$("#kel").on("click", function() {
  if (btnPress == true) {
    $("#high").html(tempH + " &#8490");
    $("#curr").html(tempC + " &#8490");
    $("#low").html(tempL + " &#8490");
  }
})

$("#cel").on("click", function() {
  if (btnPress == true) {
    kelvToCel(tempH);
    $("#high").html(tempCel.toFixed(2) + " &#8451");
    kelvToCel(tempC);
    $("#curr").html(tempCel.toFixed(2) + " &#8451");
    kelvToCel(tempL);
    $("#low").html(tempCel.toFixed(2) + " &#8451");
  }
})

$("#fah").on("click", function() {
  if (btnPress == true) {
    kelvToFah(tempH);
    $("#high").html(tempFah.toFixed(2) + " &#8457");
    kelvToFah(tempC);
    $("#curr").html(tempFah.toFixed(2) + " &#8457");
    kelvToFah(tempL);
    $("#low").html(tempFah.toFixed(2) + " &#8457");
  }
 
})
function kelvToCel(temp) {
  tempCel = temp - 273.15;
}
function kelvToFah(temp) {
  tempFah = (temp * 1.8) - 459.67
}

function determineWindDirection(deg) {
  if (deg > 348.75 && deg < 11.25) {
    windDir == "N"
  }
  if (deg > 11.25 && deg < 33.75) {
    windDir = "NNE";
  }
  if (deg > 33.75 && deg < 56.25) {
    console.log("In the spot");
    windDir = "NE";
  }
  if (deg > 56.25 && deg < 78.75) {
    windDir = "ENE";
  }
  if (deg > 78.75 && deg < 101.25) {
    windDir = "E";
  }
  if (deg > 101.25 && deg < 123.75) {
    windDir = "ESE";
  }
  if (deg > 123.75 && deg < 146.25) {
    windDir = "SE";
  }
  if (deg > 146.25 && deg < 168.75) {
    windDir = "SSE";
  }
  if (deg > 168.75 && deg < 191.25) {
    windDir = "S";
  }
  if (deg > 191.25 && deg < 213.75) {
    windDir = "SSW";
  }
  if (deg > 213.75 && deg < 236.25) {
    windDir = "SW";
  }
  if (deg > 236.25 && deg < 258.75) {
    windDir = "WSW";
  }
  if (deg > 258.75 && deg < 281.25) {
    windDir = "W";
  }
  if (deg > 281.25 && deg < 303.75) {
    windDir = "WNW";
  }
  if (deg > 303.75 && deg < 326.25) {
    windDir == "NW";
  }
  if (deg > 326.25 && deg < 348.75) {
    windDir = "NNW";
  }
  if (deg == undefined) {
    windDir = "Wind Direction is not available";
  }
}
