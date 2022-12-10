const express = require("express");
const https = require('https')

const weatherRoute = express.Router();
weatherRoute.get("/", (req, res)=>{
    res.sendFile('C:\Users\naman\OneDrive\Desktop\weathermicroservicr\client\index.html')   
})

weatherRoute.post("/", (req, res)=>{
        const city = req.body.cityName
        const appiKey = "2017efe3cbf5b7dd774b547ef0761844" 
        const unit = req.body.unit

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appiKey}&units=${unit}`

        console.log(url);
        https.get(url, (response)=>{
            response.on("data", (chunk)=>{
                const responseData = JSON.parse(chunk);
                const temperature = responseData.main.temp;
                const weatherDes = responseData.weather[0].description;
                const icon = responseData.weather[0].icon;
                const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
                const cityName = responseData.name;
                res.write(`<h1>The weather is ${temperature} degree celsius in ${cityName} and the description is ${weatherDes} </h1>`)
                res.write(`<img src=${imageURL}>`)
                res.send()
            })
        })
})
module.exports = weatherRoute

/*https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&amp;appid=efe3cbf5b7dd774b547ef0761844&amp;units=celsius

https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2017efe3cbf5b7dd774b547ef0761844*/