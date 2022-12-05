//current Weather
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(__dirname));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "f3ece45744296634943d98c07b859465";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const weatherDesc = weatherData.weather[0].description;
            res.write("<p>The weather is currently " + weatherDesc + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius</h1>");
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    });
})

app.listen(3000, function() {
    console.log("Server is running on this port");
});