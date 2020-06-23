const request = require('request')

const geocode = require('./geocode.js')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=e402a4d67c8d6eb9a4104b0807e8776f'
    request({url: url, json: true}, (error, response) => {
        const data = response.body
        if(error){
            callback("error", undefined)
        }
        else if(data.length === 0){
            callback("error", undefined)
        }
        else{
            callback(undefined, data)
        }
    })
}


// geocode.geocode("Boston", (error, data) => {
//     const lat = data.latitude
//     const lon = data.longitude
//     forecast(lat, lon, (error, data) => {
//         console.log('Error', error)
//         console.log('Data', data)
//     })
// })

module.exports = {
    forecast: forecast
}