const request = require('request')



const geocode = (address, callback) => {
    const urlLatLon = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJzaGlscmlheiIsImEiOiJja2JkbmtjMGMwZGtkMnluc3BiM2Q2c3U3In0.Pe96hG5Xg2CDlTUc13_JYw&limit=1'
    
    request({url: urlLatLon, json: true}, (error, response)=>{
        if(error){
            callback(error, undefined)
        }
        else if(response.body.length === 0){
            callback("not there", undefined)
        } 
        else {
            callback(undefined, data = {
                latitude : response.body.features[0].center[0],
                longitude :  response.body.features[0].center[1],
                location : response.body.features[0].place_name,
            })
        }
    })
}



module.exports = {
    geocode: geocode
}